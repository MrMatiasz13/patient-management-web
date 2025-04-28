import { Note } from "../utils/types/note";

function NoteListItem(note: Note) {
  return (
    <div className="flex flex-col justify-between bg-gray-200 h-40 p-4 rounded-2xl">
      <p className="font-semibold text-lg">{note.date}</p>
      <p className="break-words">{note.conclusions}</p>
    </div>
  );
}

export default NoteListItem;
