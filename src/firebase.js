import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'; // tem que autorizar no site firebase 
import 'firebase/storage'; // para upload de imagem, liberar acesso no construtor

let firebaseConfig = {
    apiKey: "AIzaSyAJ-y7xaZun4gr4Frsyh6UaQ8vSBZ7_Fd0",
    authDomain: "react-app-filmaria.firebaseapp.com",
    projectId: "react-app-filmaria",
    storageBucket: "react-app-filmaria.appspot.com",
    messagingSenderId: "1015207299188",
    appId: "1:1015207299188:web:990040db6bc65c61bde921",
    measurementId: "G-D6DZPF27TJ"
  }
// Initialize Firebase


class firebase {
    constructor(){
        //corrigir erro no firebase
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
         }else {
            app.app(); // if already initialized, use that one
         }

         //referenciando o database para acessar em outros locais
         this.app=app.database();

        // necessário liberar acesso de outros locais ao storage para upload de imagem
         this.storage = app.storage();
    }

    login(email,password){
        return app.auth().signInWithEmailAndPassword(email, password)
        
    }

    logout(){
        
        return app.auth().signOut();
    }

    /* Olheiro 
    firebase.database().ref('usuarios').child(1).on('value', (snapshot)=>{
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state);
    */

    //verifica se tem algum usuário logado e retorna o email
    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentId(){
        return app.auth().currentUser.uid
    }


    async register(nome,lastName,cel,email,password){
      await  app.auth().createUserWithEmailAndPassword(email, password)

      const uid = app.auth().currentUser.uid;

      return app.database().ref('usuarios').child(uid).set({
          nome:nome,
          lastName:lastName,
          celular:cel
      })
        
    }

    async addFavorite(idHeroi){
       
        const heroi=idHeroi;
        const uid = app.auth().currentUser.uid;
  
        return app.database().ref('usuarios').child(uid).child('Favoritos').child(heroi).set(idHeroi)
          
      }

      async deleteFavorite(idHeroi){
       
        const heroi=idHeroi;
        const uid = app.auth().currentUser.uid;
  
        return app.database().ref('usuarios').child(uid).child('Favoritos').child(heroi).remove()
          
      }

    isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve);
        })
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;

        await app.database().ref('usuarios').child(uid).once('value').then(callback)

    }

    

   

}

export default new firebase();
