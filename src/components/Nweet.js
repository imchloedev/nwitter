import { async } from "@firebase/util";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "../fbase";
import { useState } from "react";

export default function Nweet({ nweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  
  const onDelete = async () => {
    const check = window.confirm("Are you sure you want delete it?");

    const nweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

    // delete btn
    if (check) {
      await deleteDoc(nweetTextRef);
    }
  };


  const toggleEditing = () => setEditing((prev) => !prev);


  return (
    <>
      <div key={nweetObj.id}>
        <h4>{nweetObj.text}</h4>
        {isOwner && (
          <>
            <button onClick={onDelete}>Delete</button>
            <button>Edit</button>
          </>
        )}
      </div>
    </>
  );
}
