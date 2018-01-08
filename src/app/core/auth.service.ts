import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}
interface Book {
  name: string;
  author: string;
}
interface BookId extends Book {
  id: string;
}
@Injectable()
export class AuthService {
  public userid: string;
  user: Observable<User>;
  private booksCollection: AngularFirestoreCollection<Book>;
  books: Observable<BookId[]>;
  bookarray: any;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }
  // Get the book cllectin for each user
  public getData(): any {
    return this.user.map(val => {
      if (val) {
        this.booksCollection = this.afs.collection<Book>(`books/${val.uid}/collection`);
        return this.booksCollection.snapshotChanges().map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Book;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        });
      }
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data);
  }
  public updateCollection(  id, name, author ) {
    this.user.subscribe(val => {
      if (val) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`books/${val.uid}/collection/${id}`);
        const data: BookId = {
          id: id,
          name: name,
          author: author
        };
        return userRef.set(data);
      }
    });
  }
  public removeCollection(cid) {
    this.user.subscribe(val => {
      if (val) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`books/${val.uid}/collection/${cid}`);
        return userRef.delete();
      }
    });
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
