import "./styles.css";
import data from "./data.json";
import { Children, useState } from "react";

export default function App() {
  const [response, setResponse] = useState(data);
  const [isExpanded, setIsExpanded] = useState({});
  // const addNodeToList = (parentId) => {
  //   const name = prompt("Enter Folder Name");
  //   const updateTree = (nodeList) => {
  //     return nodeList.map((item, index) => {
  //       if (item.id == parentId) {
  //         return {
  //           ...item,
  //           children: [
  //             ...item.children,
  //             {
  //               id: Math.random() * 100,
  //               isFolder: true,
  //               name: name,
  //               children: [],
  //             },
  //           ],
  //         };
  //       }
  //       if (item?.children) {
  //         return { ...item, children: updateTree(item?.children) };
  //       }
  //       return item;
  //     });
  //   };
  //   setResponse((prev) => updateTree(prev));
  // };
  const addNodeToList = (itemID) => {
    const name = prompt("Please Enter Folder Name");
    const updateTree = (nodeList) => {
      return nodeList.map((node, index) => {
        if (node?.id == itemID) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: "323",
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node?.children) {
          return { ...node, children: updateTree(node?.children) };
        }
        return node;
      });
    };
    setResponse((prev) => updateTree(prev));
  };

  const deleteNodeFromList = (itemID) => {
    const updateTree = (nodeList) => {
      return nodeList
        .filter((node, index) => node?.id !== itemID)
        .map((item, index) => {
          if (item?.children) {
            return { ...item, children: updateTree(item.children) };
          }
          return node;
        });
    };

    setResponse((prev) => updateTree(prev));
  };
  const List = ({ list }) => {
    const handleIsExpanded = (name) => {
      setIsExpanded((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    };

    return (
      <>
        {list.map((item, index) => {
          return (
            <>
              <div style={{ paddingLeft: "10px" }}>
                {item?.isFolder && (
                  <span
                    onClick={() => handleIsExpanded(item.name)}
                    style={{ cursor: "pointer" }}
                  >
                    {isExpanded[item.name] ? "-" : "+"}
                  </span>
                )}
                <span>{item.name}</span>
                {item?.isFolder && (
                  <>
                    <span onClick={() => addNodeToList(item?.id)}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3979/3979527.png"
                        height="15px"
                        width="15px"
                        style={{ cursor: "pointer" }}
                      />{" "}
                    </span>
                    <span onClick={() => deleteNodeFromList(item?.id)}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                        height="10px"
                        width="10px"
                      />
                    </span>
                  </>
                )}
                {item?.isFolder && isExpanded[item.name] && (
                  <List list={item?.children} />
                )}
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div>
        <List list={response} />
      </div>
    </>
  );
}
