import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../fbase";
import { useState } from "react";
import { deleteObject } from "firebase/storage";
import { ref } from "firebase/storage";

export default function Nweet({ nweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const nweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

  const onDelete = async () => {
    const check = window.confirm("Are you sure you want delete it?");
    // delete btn
    if (check) {
      await deleteDoc(nweetTextRef);
    }

    // 삭제하려는 트윗에 이미지가 있는 경우 - 이미지 Storage에서 파일 삭제
    if (nweetObj.fileUrl !== "") {
      await deleteObject(ref(storageService, nweetObj.fileUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (e) => {
    setNewNweet(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onUpdate = async () => {
    await updateDoc(nweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  return (
    <>
      <div key={nweetObj.id}>
        {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={newNweet}
                onChange={onChange}
                required
                placeholder="edit yout nweet"
              />
              <input type="submit" value="update" onClick={onUpdate} />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.fileUrl && (
              <img src={nweetObj.fileUrl} width="50px" height="50px" />
            )}
            {isOwner && (
              <>
                <button onClick={onDelete}>Delete</button>
                <button onClick={toggleEditing}>Edit</button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
