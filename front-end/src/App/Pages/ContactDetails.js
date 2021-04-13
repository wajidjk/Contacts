import React, { useState, useContext } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import CallIcon from "@material-ui/icons/Call";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { Link, useParams } from "react-router-dom";
import { ContactStore } from "../store/contact";

function ContactDetails() {
  const contactStore = useContext(ContactStore);
  const [notes, setNotes] = useState("");
  let params = useParams();

  const result = contactStore.state.find(
    (data) =>
      `${data.name} ${data.lastname ? data.lastname : ""}`.trim() ===
      params.name
  );

  console.log({ result });

  return result ? (
    <div className="main_div">
      <div
        className="center_div"
        style={{ backgroundColor: "rgb(231, 226, 226)" }}
      >
        <div className="back">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link style={{ textDecoration: "none", color: "blue" }} to={`/`}>
              <ArrowBackIosIcon style={{ fontSize: "20px", color: "blue" }} />{" "}
              Contacts
            </Link>
          </div>

          <Link
            style={{ textDecoration: "none", color: "blue" }}
            to={`/edit-contact/${params.name}`}
          >
            Edit
          </Link>
        </div>
        <article>
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                borderRadius: "50%",
                height: "60px",
                width: 60,
                objectFit: "cover",
              }}
              src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI"
              alt=""
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <h4>{`${result.name} ${
              result.lastname ? result.lastname : ""
            }`}</h4>
            <p style={{ fontSize: 12, color: "black" }}>{result.company}</p>
          </div>
        </article>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          <div className="box">
            <ChatBubbleOutlineIcon style={{ color: "blue" }} />
            <p style={{ color: "blue" }}>message</p>
          </div>
          <div className="box">
            <CallIcon style={{ color: "blue" }} />
            <p style={{ color: "blue" }}>call</p>
          </div>
          <div className="box">
            <VideoCallIcon style={{ color: "blue" }} />
            <p style={{ color: "blue" }}>video</p>
          </div>
          <div className="box">
            <MailOutlineIcon style={{ color: "blue" }} />
            <p style={{ color: "blue" }}>mail</p>
          </div>
        </div>
        <div className="box2">
          <p
            style={{
              paddingLeft: 7,
              textAlign: "left",
              display: "flex",
              paddingTop: 5,
              paddingBottom: 7,
            }}
          >
            home
          </p>
          <p
            style={{
              paddingLeft: 7,
              textAlign: "left",
              display: "flex",
              color: "blue",
            }}
          >
            {result.phone}
          </p>
        </div>
        <div className="box2">
          <p
            style={{
              paddingLeft: 7,
              textAlign: "left",
              display: "flex",
              paddingTop: 10,
            }}
          >
            <input
              style={{
                textAlign: "left",
                width: "100%",
                backgroundColor: "white",
              }}
              placeholder="Notes"
              value={result.notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
            <br />
            <br />
            <br />
            <br />
          </p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
export { ContactDetails };
