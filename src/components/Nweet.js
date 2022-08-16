import { async } from "@firebase/util";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "../fbase";
import { useState } from "react";

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
    setEditing(false)
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
