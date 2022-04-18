# SolaJump Minter

# To-Do - 28/11/2021:
1. ~~Connect game and test function connectivity.~~
2. ~~Proper redirection to mintpage, even after 1 mint - via button in login page.~~
3. ~~Sort the documents in the firebase, or sort and store them.~~
4. Discord bot API to connect to sorted leaderboard and display in discord server
5. Develop FrontEnd in login page, mint page and in dialog windows.
6. If game-app is not accessed through login-page, redirect away to mint-page. 

# Zhao : To Do 29/11 - 05/12:
1. Change default page to login page..
2. PROBLEM : No redirect after minting is complete, redirect to login page automatically after mint is successful..
3. prep function to sort all docs by highscores from high to low, save as JSON username : highscore , put placeholder in HTTPS post.
4. Prepare RUST solana smart contract to distribute from TREASURY address, to all the 1,000 winners, please refer to solajump.com to understand how to distribute for winners.
The smart contract receives parameter that is 'DURATION' , in days, if DURATION = 3, then in 3 days, 72 hrs from calling the contract - SOL would be distributed to all addressses accordingly. **Prepare this for review by 05/12**



## Documentation..

# getTop10RankData 
Called at login, index.tsx:110 each time a user is confirmed. via getWalletMintAddressses().

# saveToLocalStorage
Receives 'info' as parameter. is called at login/index.tsx:97 and receives totalDocIdList[].

**totalDocIdList** - calls updateDocuments(), updates the current document with username and email.

or it calls updatedUnamedDocuments.

TotalDocIdList is updated from getDocumentID() login/index.tsx:121
By receiving every 'defined document' that belongs to that wallet as **retResult.docID**

**getDocumentID** - If there is a walletmint address, check if mintAddr exists in our db, if it does check if there is a document and that the lives aren't at 0
Push to totalDocList[] each defined document, meaning, mintadrr exists, lives are defined and lives are above zero.

**retResult object** - defined after isMintAddressExists() is called to db, after we check if the NFT result exists,
 we return
  doc.ID, 
  walletAddr, 
  username, 
  email, 
  lives and score.



-------

# Testing Use-cases:
1. No Wallet - No NFT - No Access
2. NFT exists but new wallet - Update wallet
3. Username exists in the system - display 'user exists' 
4. Anti-fuzzing mechanism
5. sessionStorage multiple docs ownership
6. sessionStorage constant update
7. Out of lives msg, please purchase our NFT-Entry tickets
8. Out of lives in doc1, but 10 in doc2 , will it pass and update?
9. Highscore sorting, JSON username: highscore pair, post to console log as JSON object.
10. Updating .env configurations.


## Zhaohui logs..

------
(22/11/2021 List)

What I(ZhaoHui) did today.

1. Create Login page with connect button. (src/components/login/index.tsx)
2. When wallet is connected in the login page, get all SPL token accounts. (src/utils/accounts.tsx:19 getAllTokenAccounts)
3. Update getMintID function with mintAddresses instead of mintTxID. (src/components/firebase.ts:9) 
   In this function update document ID below than 10 to add prefix "0", so that 00, 01, 02, ..., 09, 10, 11, ...
4. Add compare Token function according to the main DB. (firebase.ts : 34, isAlreadyMinted, getWalletExists )
5. Fix setAlertState message notification(remove my function notify)

What I didn't finish today.

1. CandyMachine has not remaining things, so couldn't test onMint function working well.
2. After login, redirect is not working( from /login to home)
3. I remove all dbs from main collection in firebase, so couldn't test compare function working correctly.

Wanted to ask to Anthony

1. I want to create new CandyMachine, so that I can mint from tomorrow.
--------


(23/11/2021 List)

Implemented today

In Login. (url: localhost:3000/login)
1. After wallet is connected, get all account tokens mintAddress of wallet.(getAllTokenAccounts function in accounts.tsx)
2. After getting all tokens, loop all mintAddress with our db(main). (isAlreadyMinted in firebase.ts)
   Here this function returns the document ID.
3. After getting all ID of tokens, get Max document ID of them. (getDocumentID in login/index.tsx : 52)
   Here, if getting ID is bigger than -1, it automatically redirects to Home link. ???

??? 

In Home
1. Test mint working with MintAddresses with walletAddress. (getAllTokenAccounts function in accounts.tsx)
2. Saving user information(wallet address, username, user email) function implemented in firebase.ts(saveGameInfo)

Dialog component for user information is already made.

-------

(24/11/2021 List)


In firebase

1. Save each mint address with wallet address pair to firebase(Game Collection) : firebase.ts: 10
2. If current walletAddress is not match to database, update its mintAddress: firebase.ts: 62 
3. If document has no username(it means it is just minted and first time to use), update username with dialog: updateUnnamedDocuments
4. In isMintAddressExists function (firebase.ts:37) returns docID, walletAddress, username, email.
   with these value we can check walletAddress is different and username is existed(= if it is first time to use this token).

In Login page

1. After checking all tokens for mintAddress, if its walletAddress is different, update its walletAddress with current wallet.(login/index.tsx:73)
2. If username does not exist for current document, add current docID to array.(this is for updating at last) (login/index.tsx:80)
3. NewInfoFlag flag is used to find document(without username), it is set to true so the user dialog displayed. (login/index.tsx:111)
4. When click cancel button, it doesn't do anything and return to pages.
5. When user input username and email, and click Update, the documents without username is updated to typed username and email.
   (updateUnnamedDocs: login/index.tsx:41, firebase.ts:70 updateUnnamedDocuments)
   
-----------

(25/11/2021 List)

In Login page

1. Added 3 dialogs (Redirect to mint page, redirect to game page, confirm dialog).
   mint redirect alert dialog (login/index.tsx:232), game redirect alert dialog(login/index.tsx:244), confirm dialog(login/index.tsx:255)
2. Change the logic for confirm page and update username and email dialog.
   - in confirm dialog, if user click "No", unnamed document has default username and email(already in db). returnToGame: 82(login/index.tsx)
   - in confirm dialog, if user click "Yes", update dialog appeared. 
   - if user click "update" in update dialog, it updates all usernames and emails in the db(for every document match to mint address). updateUnnamedDocs:72
   - if user click "cancel" in update dialog,unnamed document has default username and email(already in db). returnToGame: 82(login/index.tsx)
3. When user click "No" or "Cancel" or "Update" button on dialog, it shows "Redirects to game" and redirects after 3 seconds.
   useEffect: line:53, useEffect:line: 62

Context for Document for updates(in game end or after used in the future).

Not implemented.
Notification part is not working well now. just css customized, but not work smoothly.

--------------

(26/11/2021 List)



In Login page,

1. Update sessionStorage data with existed document ID. index.tsx:88
2. Context implementation finished. (login/index.tsx: 72,)
3. Storage file added. (utils/storage.tsx)
4. model added.   (model/index.tsx)


(30/11/2021 List)

In firebase.ts function, there's sortDocumentsByOwner function.(line:91)

It sorts all documents according to the highscore.


(1/12/2021 List)

Username and Email validation finished.

