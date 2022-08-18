import "./styles.css";
import React, { useState, useEffect } from "react";
import AddRelation from "./AddRelation";
import AddPeople from "./AddPeople";
import ProfImg from "./ProfileImg";
import { Button } from "react-bootstrap";
import image from "./img1.png";
import Relations from "./Relations";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";

export default function App() {
  const [showPeople, setShowPeople] = useState([]);
  const [people, setPeople] = useState([]);
  const [toggle, setToggle] = useState("View More");
  const [selectedPeople, setSelectedPeople] = useState({});
  const [result, setResult] = useState([]);
  // const [count,setCount]=useState(0);
  useEffect(() => {
    // console.log({ people });
  }, [people]);

  // useEffect(() => {
  //   setPeople([
  //     { name: "Sameer", friend: ["Kamalnath sharma", "Aayushi"] },
  //     { name: "Aayushi", friend: ["Sameer", "Bhaskar"] },
  //     { name: "Bhaskar", friend: ["Sahnti kumar shah", "Aayushi"] },
  //     { name: "Sahnti kumar shah", friend: ["Bhaskar", "Kamalnath sharma"] },
  //     { name: "Kamalnath sharma", friend: ["Sameer", "Sahnti kumar shah"] }
  //   ]);
  // }, []);

  useEffect(() => {
    if (selectedPeople?.people1 && selectedPeople?.people2)
      findSeparation(selectedPeople?.people1, selectedPeople?.people2, []);
  }, [selectedPeople]);

  useEffect(() => {
    // const temp = [];
    // for (let x = 0; x < 5; x++)
    //   temp.push(<ProfImg img={image} name={`Name ${x}`} />);
    setShowPeople(
      people
        ?.map((data, index) => {
          if (index < 5) return <ProfImg img={image} name={data.name} />;
          return undefined;
        })
        .filter((data) => data !== undefined)
    );
  }, [people]);

  const viewMore = () => {
    if (people.length > 5) {
      setToggle("Show Less");
      setShowPeople(
        people.map((data) => <ProfImg img={image} name={data.name} />)
      );
    }
  };

  const showLess = () => {
    setToggle("View More");
    setShowPeople(
      people
        .map((data, index) => {
          if (index < 5) return <ProfImg img={image} name={data.name} />;
          return undefined;
        })
        .filter((data) => data !== undefined)
    );
  };

  const addPeople = ({ name }) => {
    if (people?.length) {
      for (let ppl of people) {
        if (ppl.name === name) {
          alert(`${name} already exist`);
          return false;
        }
      }
    }
    setPeople((prevPeople) => [...prevPeople, { name }]);
  };

  const addRelation = (people1, people2) => {
    setPeople(
      people.map((ppl, index) => {
        //finding people1
        if (ppl?.name === people1) {
          if (!ppl?.friend || (ppl?.friend && !(ppl.name in ppl.friend)))
            return ppl.friend
              ? { ...ppl, friend: [...ppl.friend, people2] } //  there are prv freiend adding those with new
              : { ...ppl, friend: [people2] }; // there are no prv so adding only new one
        } else if (ppl?.name === people2) {
          // finding people 2
          if (!ppl?.friend || (ppl?.friend && !(ppl.name in ppl.friend)))
            return ppl.friend
              ? { ...ppl, friend: [...ppl.friend, people1] }
              : { ...ppl, friend: [people1] };
        }
        return ppl;
      })
    );
  };
  const onChange = (e, name) => {
    if (name === "people1") setSelectedPeople({});
    setResult([]);
    setSelectedPeople((prev) => ({ ...prev, [name]: e }));
  };

  const findSeparation = (people1, people2, visitedPeople) => {
    const temp = [...visitedPeople];
    temp.push(people1);
    const people1Ob = people.find((ppl) => ppl.name === people1);
    if (people1Ob?.friend.includes(people2)) {
      setResult((prev) => [...prev, [...visitedPeople, people1, people2]]);
      console.log([...visitedPeople, people1, people2]);
      return [...visitedPeople, people1, people2];
    } else {
      for (let ppl of people1Ob.friend) {
        if (!visitedPeople.includes(ppl)) findSeparation(ppl, people2, temp);
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <AddPeople addPeople={(name) => addPeople(name)} />
        <AddRelation people={people} addRelation={addRelation} />
        {/* <Button style={{ background: "#435f4b" }}>View Separation</Button> */}
      </div>
      <div className="imageContainerParent">
        <h5>People</h5>
        <div className="imageContainer">{showPeople}</div>

        <div className="showMore">
          <Button
            style={{ background: "#435f4b" }}
            onClick={toggle === "View More" ? viewMore : showLess}
          >
            {toggle}
          </Button>
        </div>
      </div>
      <div className="relations">
        <h5>Degree of separation between</h5>
        <div className="separator">
          <DropdownButton
            id="dropdown-basic-button,et"
            variant="secondary"
            name="people1"
            title={selectedPeople?.people1 || "Add people"}
            onSelect={(e) => onChange(e, "people1")}
          >
            {people?.map((data) => (
              <Dropdown.Item eventKey={data.name}>{data.name}</Dropdown.Item>
            ))}
          </DropdownButton>
          <h5>&</h5>
          <DropdownButton
            id="dropdown-basic-button"
            name="people2"
            variant="secondary"
            title={selectedPeople?.people2 || "Add people"}
            onSelect={(e) => onChange(e, "people2")}
          >
            {people?.map((data) => (
              <Dropdown.Item eventKey={data.name}>{data.name}</Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        {result?.map((data) => (
          <Relations data={data} />
        ))}
      </div>
    </div>
  );
}
