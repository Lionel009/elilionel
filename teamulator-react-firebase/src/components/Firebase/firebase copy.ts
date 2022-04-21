import { useContext} from "react"
import { initializeApp } from "firebase/app"
import firebaseConfig from './config';
import { getFirestore, collection, addDoc, getDocs, doc, query, where, setDoc, updateDoc, getDoc, Firestore, DocumentReference, DocumentData, DocumentSnapshot, orderBy, limit} from 'firebase/firestore/lite';

import {Context} from "../../hooks/ContextProvider"
import uuid from 'react-uuid'
// const context = useContext(Context);

// version 9 MODULAR

const Firebase = initializeApp(firebaseConfig);

export default Firebase;
const exists: string[] = [] ?? [];

export const db = getFirestore(Firebase);

export const AddDataBase7000Gamer = async () => {

let array:any[] = [];

	for (let index = 0; index < 7000; index++) {

		let superRandom = Math.floor(Math.random() * 1000000)
		await setDoc(doc(db, "Mints", uuid() ), {
			highscore: superRandom, 
			lives: 10, 
			log: [], 
			username: "UserFactice", 
			wallet: uuid()
		});

	}	

}

export const ReadContest = async () => {

	const docRef = doc(db, "adminContest/contest");
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
	// console.log("Document data:", docSnap.data());
	return docSnap.data().contest
	} else {
	// doc.data() will be undefined in this case
	console.log("No such document!");
	}
}

export const getTop10RankDataElie = async () => {

	const q = query(collection(db, `usersWallets`));
	const walletArray = await getDocs(q);

	let data_array:any[] = [];
	//console.log(walletArray);
	
	walletArray.forEach(async (dc) => {
	//	console.log(dc);
		
		let tmp:any = {};
		tmp.walletAddress = dc.id;
		data_array.push(tmp as any);
			
		});	
	console.log(data_array);	
	
	return data_array;

}

export const getDocDataSendUserData = async (walletAddress, mintAddress) => {
	const docRef = doc(db, `Mints/${mintAddress}`);
	const docSnap = await getDoc(docRef);


	if (docSnap.exists()  ) {

		const usernameData = docSnap.data()
	//	console.log(usernameData);

		let ObjectData = {
			username : usernameData.username ,
			lives :  usernameData.lives ,
			highscore :  usernameData.highscore, 
			mintAddress : mintAddress
		}
		
		
		return ( ObjectData )
	} else {
	// doc.data() will be undefined in this case
	 console.log("No such document!");
	}

};

export const getAllHighscores = async() => {
//	console.log("getAllHighscore open");
	
	const docs = query(collection(db,'Mints'),orderBy("highscore", "desc"), limit(10));
	const snap = await getDocs(docs);

	let data_array:any[] = [];
	snap.forEach((dc)=> {
			
		let tmp:any = {};
		tmp.mintAddress = dc.id
		tmp.highscore = dc.data().highscore;
		tmp.username = dc.data().username;
		data_array.push(tmp as any);
		//console.log(`highscores: ${highscores}`)
	})
	console.log( data_array)
	return data_array;
}

export const getAllDataBaseToRank = async (mintAddress) => {

	const docs = query(collection(db,'Mints'),orderBy("highscore", "desc"));
	// , limit(100)
	const snap = await getDocs(docs);

	let data_array:any[] = [];
	let rank = 1
	snap.forEach((dc)=> {
			
		let tmp:any = {};
		tmp.rank= rank++
		tmp.mintAdress = dc.id
		tmp.highscore = dc.data().highscore;
		tmp.username = dc.data().username;
		data_array.push(tmp as any);

	})
	
	 let QuelRankJeSuis =  data_array.filter(x => x.mintAdress === mintAddress)
	 
	return QuelRankJeSuis;
}

export const updateUsername = async (  usernameFromUnity, mintAddress  ) => {
	console.log(usernameFromUnity);
	console.log(mintAddress);
	
	const currDoc = doc(db, `Mints/${mintAddress}`);

	await updateDoc(currDoc, {
		username: usernameFromUnity
	});

};

export const walletToAllNft = async (walletAddress) => {
	console.log('wallet to nft open');
	
	const querySnapshot = await getDocs(collection(db, "Mints"));
	let data_array:any[] = [];
	querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
	// console.log(doc.id, " => ", doc.data());

	let tmp:any = {};
	tmp.mintAdress = doc.id;
	tmp.wallet = doc.data().wallet;
	tmp.lives = doc.data().lives;
	data_array.push(tmp as any);
	});
	// console.log(data_array);

	let searchWalletToMint =  data_array.filter(x => x.wallet === walletAddress)
	// console.log(searchWalletToMint);
	return searchWalletToMint
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//register new user with database schema, without mints.

export const  registerUser = async (uid, email) => {
	console.log("ouverture de register", uid, email);
	
	await setDoc(doc(db, "user", uid), {
		uid: uid,
		email: email,
		role: "3"
	  });

	return true;
	};



// save walletAddress with mintAddress when user mints in home page.
export const  getMintId = async (mintAddress, walletAddress) => { // TESTING PASSED. restricted mint amount to 2
	// console.log(`Currently adding mint... : ${mintAddress}`) // REMOVE BEFORE PROD.
	await setDoc(doc(db,`usersWallets/${walletAddress}/mints`, mintAddress), {
		lives: 10,
		EternalLives:0,
		highscore:0
	});
	 if(walletAddress == undefined){
		return console.log('wallet is undefined, please connect wallet..')
	}
}


export const getWalletExists = async (walletAddress) => {
	let state = false;
	const docRef = doc(db,`usersWallets`,walletAddress);
	if(docRef != undefined || docRef != null){
		state = true
	}
	// console.log(`walletAddress inside getWalletExist param is: ${walletAddress}`)
	return state;
};

// compare wallet token mint address with firebase stored DB.
export const isMintAddressExists = async (mintAddress, walletAddress) => {
	let email, docID
	let index =0;
	// console.log(`wallet address is ${walletAddress}`)
	const docRef = doc(db, `usersWallets/${walletAddress}/private/`,'info')
	let snapShot = await getDoc(docRef)
	const data = snapShot.data();
	email = data?.email;
	// console.log(`email found at that doc: ${email}`)

	
	// query if mints exist in that wallet.
	const q = query(collection(db,`usersWallets/${walletAddress}/mints`));
	const snapMint = await getDocs(q)
	snapMint.forEach((dc)=> {
		if(dc.id == mintAddress){
			// console.log(`snapMint found matching : ${dc.id}`);
			exists.push(dc.id)
		}
	})
	// console.log(exists)
	return exists;
};


// update current document for wallet Address with new.
// export const updateWalletAddressForDifferent = async (docID, walletAddress) => {
// 	const currDoc = doc(db, "usersWallets","Mints", docID);
// 	await updateDoc(currDoc, {
// 		walletAddress:walletAddress,
// 	});
// };

// update current document with new username, user email.
export const updateDocuments = async (docID, username, email) => {
	const currDoc = doc(db, `usersWallets/${docID}`, docID);
	await updateDoc(currDoc, {
		username:username,
		email:email,
	});
};

// update current document with new username, user email and add highscore(0), lives(10)
export const updateUnnamedDocuments = async (walletAddress, username, email) => {
	const currDoc = doc(db, `usersWallets`, walletAddress);
	await updateDoc(currDoc, {
		username:username,
		// email:email,
		// lives:10,
		// highscore:0,
		// eternalLives:0
	});
};

export const getTop10RankData = async () => {
	const q = query(collection(db, "main"));
	const querySnapshot = await getDocs(q);

	let data_array:any[] = [];
	querySnapshot.forEach(async (dc) => {
		let tmp:any = {};
		tmp.docID = dc.id;
		tmp.walletAddr = dc.get("walletAddress");
		tmp.username = dc.get("username");
		// tmp.email = dc.get("email");
		// tmp.lives = dc.get("lives");
		tmp.walletAddress = dc.get("walletAddress");
		tmp.highscore = dc.get("highscore");
		data_array.push(tmp as any);
	});
	data_array.sort(compare);
	let score_array:any[] = [];
	for(var i=0; i<Math.min(5, data_array.length); i++){
		score_array.push({rank:i+1,username:data_array[i].username, highscore:data_array[i].highscore,wallet:data_array[i].walletAddress});
	}
	return score_array;
	//return data_array;
}

function compare( a, b ) {
	if(a.highscore === undefined) return 1;
	if(b.highscore === undefined) return -1;
	if ( a.highscore > b.highscore ){
	  return -1;
	}
	if ( a.highscore < b.highscore ){
	  return 1;
	}
	return 0;
}
