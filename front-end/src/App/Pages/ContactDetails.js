import React, { useState, useContext } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import CallIcon from "@material-ui/icons/Call";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { Link, useParams } from "react-router-dom";
import { ContactStore } from "../store/contact";
import { useQuery } from "react-query";

function ContactDetails() {
  const contactStore = useContext(ContactStore);
  const [notes, setNotes] = useState("");
  let params = useParams();

  const { data, error, isLoading } = useQuery(
    ["contacts", params.id],
    async (a, b) => {
      console.log("fetching single contact");
      const response = await fetch(
        `http://localhost:5000/api/contacts/${params.id}`
      );

      return (await response.json()).contact;
    }
  );

  return data ? (
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
            to={`/edit-contact/${params.id}`}
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
              src={
                (data.image && `http://localhost:5000/${data.image}`) ||
                `https://i.stack.imgur.com/y9DpT.jpg`
              }
              alt=""
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <h4>{`${data.name} ${data.lastname ? data.lastname : ""}`}</h4>
            <p style={{ fontSize: 12, color: "black" }}>{data.company}</p>
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
            {data.phone}
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
              value={data.notes}
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
