
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { conReq } from '../../models/request'
import { Events } from 'ionic-angular';
@Injectable()
export class UserServiceProvider {
  firedata = firebase.database().ref('/whatsapp-e72e8')
  firereq = firebase.database().ref('/requests');
  nativepath: any;
  myFriends
  userDetails
  firestore = firebase.storage();
  firefriends = firebase.database().ref('/friends');
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  firebuddychats = firebase.database().ref('/buddychats');
  buddy: any;
  buddymessages = [];
  fireGroup = firebase.database().ref('/groups');
  myGroups: Array<any> = [];
  currentGroup
  currentgroup: Array<any> = [];
  currentgroupname;
  groupmsgs
  constructor(public afireauth: AngularFireAuth, private Camera: Camera, private events: Events) {
    console.log('Hello UserServiceProvider Provider');
    this.myPhotosRef = firebase.storage().ref('/Photos/');
  }


  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
        alert(snapshot.val())
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getAllUsers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  sendrequest(req: conReq) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        resolve(err);
      })
    })
    return promise;
  }

  getmyrequests() {
    let allmyrequests;
    var myrequests = [];
    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      myrequests = [];
      for (var i in allmyrequests) {
        myrequests.push(allmyrequests[i].sender);
      }
      this.getAllUsers().then((res) => {
        var allusers = res;
        this.userDetails = [];
        for (var j in myrequests)
          for (var key in allusers) {
            if (myrequests[j] === allusers[key].uid) {
              this.userDetails.push(allusers[key]);
            }
          }
        this.events.publish('gotrequests');
      })

    })
  }
  acceptRequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.myFriends = [];
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: buddy.uid
      }).then(() => {
        this.firefriends.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          this.deleteRequest(buddy).then(() => {
            resolve(true);
          })

        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  deleteRequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', (snapshot) => {
        let somekey;
        for (var key in snapshot.val())
          somekey = key;
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
          resolve(true);
        })
      })
        .then(() => {

        }).catch((err) => {
          reject(err);
        })
    })
    return promise;
  }

  getMyFriends() {
    let friendsuid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      let allfriends = snapshot.val();
      this.myFriends = [];
      for (var i in allfriends)
        friendsuid.push(allfriends[i].uid);

      this.getAllUsers().then((users) => {
        this.myFriends = [];
        for (var j in friendsuid)
          for (var key in users) {
            if (friendsuid[j] === users[key].uid) {
              this.myFriends.push(users[key]);
            }
          }
        this.events.publish('friends');
      }).catch((err) => {
        alert(err);
      })

    })
  }

  intializeBuddy(buddy) {
    this.buddy = buddy
  }

  addnewmessage(msg) {
    if (this.buddy) {
      var promise = new Promise((resolve, reject) => {
        this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
          }).catch((err) => {
            reject(err);
          })
        })
      })
      return promise;
    }
  }

  getbuddymessages() {

    let temp;
    this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).on('value', (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.buddymessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

  addGroup(newGroup) {
    var promise = new Promise((resolve, reject) => {
      this.fireGroup.child(firebase.auth().currentUser.uid).child(newGroup.groupName).set({
        msgboard: '',
        owner: firebase.auth().currentUser.uid
      }).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    });
    return promise;
  }

  getmygroups() {
    this.fireGroup.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.myGroups = [];
      if (snapshot.val() != null) {
        var temp = snapshot.val();
        for (var key in temp) {
          var newgroup = {
            groupName: key,
          }
          this.myGroups.push(newgroup);
        }
      }
      this.events.publish('allmygroups');
    })

  }

  getintogroup(groupname) {
    if (groupname != null) {
      this.currentgroupname = groupname
      this.fireGroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
        if (snapshot.val() != null) {
          var temp = snapshot.val().members;
          this.currentgroup = [];
          for (var key in temp) {
            this.currentgroup.push(temp[key]);
          }
          this.currentgroupname = groupname;
          this.events.publish('gotintogroup');
        }
      })
    }
  }

  getOwnerShip(groupname) {
    var promise = new Promise((resolve, reject) => {
      this.fireGroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
        var temp = snapshot.val().owner;
        if (temp == firebase.auth().currentUser.uid) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  addmember(newmember) {
    console.log(this.currentgroupname)
    this.fireGroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').push(newmember).then(() => {
      this.fireGroup.child(newmember.uid).child(this.currentgroupname).set({
        owner: firebase.auth().currentUser.uid,
        msgboard: ''
      }).catch((err) => {
        console.log(err);
      })
      this.getintogroup(this.currentgroupname);
    })
  }

  deleteMember(member) {
    this.fireGroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname)
      .child('members').orderByChild('uid').equalTo(member.uid).once('value', (snapshot) => {
        snapshot.ref.remove().then(() => {
          this.fireGroup.child(member.uid).child(this.currentgroupname).remove().then(() => {
            this.getintogroup(this.currentgroupname);
          })
        })
      })
  }

  getgroupmembers() {
    this.fireGroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
      var tempdata = snapshot.val().owner;
      this.fireGroup.child(tempdata).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        var tempvar = snapshot.val();
        for (var key in tempvar) {
          this.currentgroup.push(tempvar[key]);
        }
      })
    })
    this.events.publish('gotmembers');
  }

  deletegroup() {
    return new Promise((resolve, reject) => {
      this.fireGroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        var tempmembers = snapshot.val();

        for (var key in tempmembers) {
          this.fireGroup.child(tempmembers[key].uid).child(this.currentgroupname).remove();
        }

        this.fireGroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
          resolve(true);
        }).catch((err) => {
          reject(err);
        })

      })
    })
  }

  leavegroup() {
    return new Promise((resolve, reject) => {
      this.fireGroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
        var tempowner = snapshot.val().owner;
        this.fireGroup.child(tempowner).child(this.currentgroupname).child('members').orderByChild('uid')
          .equalTo(firebase.auth().currentUser.uid).once('value', (snapshot) => {
            snapshot.ref.remove().then(() => {
              this.fireGroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
                resolve(true);
              }).catch((err) => {
                reject(err);
              })
            }).catch((err) => {
              reject(err);
            })
          })
      })
    })
  }

addgroupmsg(newmessage) {
  return new Promise((resolve) => {
 
  this.fireGroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('owner').once('value', (snapshot) => {
    var tempowner = snapshot.val();
    this.fireGroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('msgboard').push({
      sentby: firebase.auth().currentUser.uid,
      displayName: firebase.auth().currentUser.displayName,
      photoURL: firebase.auth().currentUser.photoURL,
      message: newmessage,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
      if (tempowner != firebase.auth().currentUser.uid) {
        this.fireGroup.child(tempowner).child(this.currentgroupname).child('msgboard').push({
          sentby: firebase.auth().currentUser.uid,
          displayName: firebase.auth().currentUser.displayName,
          photoURL: firebase.auth().currentUser.photoURL,
          message: newmessage,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        })
      }
      var tempmembers = [];
      this.fireGroup.child(tempowner).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        var tempmembersobj = snapshot.val();
        for (var key in tempmembersobj)
          tempmembers.push(tempmembersobj[key]);
      }).then(() => {
        let postedmsgs = tempmembers.map((item) => {
          if (item.uid != firebase.auth().currentUser.uid) {
            return new Promise((resolve) => {
              this.postmsgs(item, newmessage, resolve);
            })
          }
        })
        Promise.all(postedmsgs).then(() => {
          this.getgroupmsgs(this.currentgroupname);
          resolve(true);
        })
      })
    })
  })
  })  
}

postmsgs(member, msg, cb) {
  this.fireGroup.child(member.uid).child(this.currentgroupname).child('msgboard').push({
          sentby: firebase.auth().currentUser.uid,
          displayName: firebase.auth().currentUser.displayName,
          photoURL: firebase.auth().currentUser.photoURL,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
  }).then(() => {
    cb();
  })
}

getgroupmsgs(groupname) {
  this.fireGroup.child(firebase.auth().currentUser.uid).child(groupname).child('msgboard').on('value', (snapshot) => {
    var tempmsgholder = snapshot.val();
    this.groupmsgs = [];
    for (var key in tempmsgholder)
      this.groupmsgs.push(tempmsgholder[key]);
    this.events.publish('newgroupmsg');
  })
}
}
