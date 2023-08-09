import React from "react";
import * as fs from "fs";
import XMLData from "./sitemap.xml";
import axios from "axios";

const Sitemap = () => {
  // Read an xml file
  const [xml, setXml] = React.useState("");
  axios
    .get(XMLData, {
      "Content-Type": "application/xml; charset=utf-8",
    })
    .then((response) => {
      setXml(response.data);
    });
  // Display the file content
  return (
    <pre>
      <code>{xml}</code>
    </pre>
  );
};

export default Sitemap;
