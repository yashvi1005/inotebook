import Notes from "./Notes";


const Home = (props) => {
  const {showAlert} = props
  // const context = useContext(noteContext);
  // const {notes, setNotes} = context;
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
