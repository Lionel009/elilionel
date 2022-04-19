import { initializeApp } from "firebase/app"
import config from './config';
import { getFirestore, doc, setDoc, getDoc , collection, getDocs, updateDoc, where, query} from 'firebase/firestore/lite';

// const context = useContext(Context);

// version 9 MODULAR

const Firebase = initializeApp(config.firebase);

export default Firebase;


export const db = getFirestore(Firebase);


export const  registerUser = async (uid, email) => {
	console.log("ouverture de register", uid, email);
	
	await setDoc(doc(db, "user", uid), {
		uid: uid,
		email: email,
		role: 2, 
		isAccess: false
	  });

	return true;
};


export const getUserData = async (uid) => {
	const docRef = doc(db, `user/${uid}`);
	const docSnap = await getDoc(docRef);

	if ( docSnap.exists() ) {

		const userData = docSnap.data()

		let ObjectData = {
			isAccess: userData.isAccess, 
			role: userData.role
		}

		return ( ObjectData )
	} else {
	// doc.data() will be undefined in this case
	 console.log("No such document!");
	}

}; 

export const getUsersNoAdmin = async () => {

	const q = query(collection(db, "user"), where("role", "==", 2));

	const querySnapshot = await getDocs(q);
	let data_array:any[] = [];
	querySnapshot.forEach((doc) => {
	  // doc.data() is never undefined for query doc snapshots
	  let littleObjectForArray:any = {};
	  littleObjectForArray.uid = doc.id;
	  littleObjectForArray.email = doc.data().email;
	  littleObjectForArray.isAccess = doc.data().isAccess;

	  data_array.push(littleObjectForArray as any);
	});
//	console.log(data_array);
	
	return data_array;
}

export const updateBoolValue = async (  boolValue, uid) => {
//	console.log("updataBOol actif",uid, boolValue );

	const currDoc = doc(db, `user/${uid}`);

	await updateDoc(currDoc, {
		isAccess: boolValue
	});

};


// export const getAllUser = async () => {

// 	const querySnapshot = await getDocs(collection(db, "user"));
// 	let data_array:any[] = [];
// 	querySnapshot.forEach((doc) => {

// 		let littleObjectForArray:any = {};
// 		littleObjectForArray.uid = doc.id;
// 		littleObjectForArray.email = doc.data().email;
// 		littleObjectForArray.isAccess = doc.data().isAccess;

// 		data_array.push(littleObjectForArray as any);
			
// 		});	
// 	  // doc.data() is never undefined for query doc snapshots
	 

// 	  return data_array;

// }