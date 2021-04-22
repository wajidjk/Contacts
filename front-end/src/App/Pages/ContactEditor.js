import React, { useEffect, useState, useContext } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ACTIONS, ContactStore } from "../store/contact";
import { Link, useHistory, useParams } from "react-router-dom";
import { queryClient } from "../../api";
import { useMutation, useQuery } from "react-query";

export function ContactEditor(props) {
  const contactStore = useContext(ContactStore);

  let params = useParams();
  let history = useHistory();

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const { data, error, isLoading } = useQuery(
    ["contacts", params.id],
    async (a, b) => {
      const response = await fetch(
        `http://localhost:5000/api/contacts/${params.id}`
      );

      return (await response.json()).contact;
    },
    {
      enabled: !!params.id,
    }
  );

  const { mutate: deleteContact } = useMutation(
    async ({ id }) => {
      const response = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      return await response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts");
        handleClose();
        history.push("/");
      },
    }
  );

  const { mutate: addContact } = useMutation(
    async (input) => {
      console.log(input);
      const response = await fetch(`http://localhost:5000/api/contacts/`, {
        body: JSON.stringify(input),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      return (await response.json()).contact;
    },
    {
      onSettled: (data) => {
        const _contacts = queryClient.getQueryData(["contacts"]);
        console.log({ _contacts });
        queryClient.setQueryData(["contacts"], [..._contacts, data]);
      },
      onSuccess: () => {
        history.push("/");
      },
    }
  );

  const { mutate: updateContact } = useMutation(
    async (input) => {
      console.log(input);
      const response = await fetch(
        `http://localhost:5000/api/contacts/${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify(input),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      // neya contact
      return (await response.json()).contact;
    },
    {
      onSettled: (data) => {
        // old contacts
        const _contacts = queryClient.getQueryData(["contacts"]);

        const index = _contacts.findIndex((el) => el._id === data._id);
        if (index === -1) return;
        _contacts[index] = data;

        queryClient.setQueryData(["contacts"], _contacts);
      },
      onSuccess: () => {
        history.push("/");
      },
    }
  );

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setLastName(data.lastname || "");
      setCompany(data.company || "");
      setPhone(data.phone || "");
      setNotes(data.notes || "");
    }
  }, [data]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="main_div">
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Want to Delete?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            style={{ color: "red" }}
            onClick={() => {
              deleteContact({
                id: params.id,
              });
            }}
            color="primary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

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
              Cancel
            </Link>
          </div>

          <p
            style={{ textDecoration: "none", color: "blue" }}
            onClick={() => {
              if (params.id) {
                updateContact({
                  name,
                  lastname,
                  company,
                  phone,
                  notes,
                });
              } else {
                addContact({
                  name,
                  lastname,
                  company,
                  phone,
                  notes,
                });
              }
            }}
          >
            Done
          </p>
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
                height: "100px",
                width: 100,
                objectFit: "cover",
              }}
              src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI"
              alt=""
            />
          </div>
          <div style={{ marginTop: 5, fontSize: 14 }}>
            <h4 style={{ color: "blue", fontWeight: "lighter" }}>Edit</h4>
          </div>
        </article>
        <div
          style={{
            borderBottom: "1px solid rgb(207, 204, 204)",
            borderTop: "1px solid rgb(207, 204, 204)",
            backgroundColor: "white",
          }}
        >
          <ol className="ol">
            <li className="editname">
              <input
                placeholder="First name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </li>
            <li className="editname">
              <input
                placeholder="Last name"
                value={lastname}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </li>

            <li className="editname">
              <input
                placeholder="Company"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              />{" "}
            </li>
          </ol>
        </div>
        <br />
        <br />
        <div
          style={{
            borderBottom: "1px solid rgb(207, 204, 204)",
            borderTop: "1px solid rgb(207, 204, 204)",
            backgroundColor: "white",
          }}
        >
          <ol className="ol">
            <li className="editname">
              <FormControl>
                <Input
                  style={{
                    fontSize: 14,
                    textDecoration: "none",
                    outline: "none",
                    border: "none",
                  }}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <CancelIcon
                        style={{ color: "red", fontSize: "medium" }}
                      />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </li>
          </ol>
        </div>
        <br />

        <div
          style={{
            borderBottom: "1px solid rgb(207, 204, 204)",
            borderTop: "1px solid rgb(207, 204, 204)",
            backgroundColor: "white",
          }}
        >
          <ol>
            <li className="editname" style={{ paddingLeft: "5px" }}>
              <input
                placeholder="Notes"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />

              <br />
              <br />
            </li>
          </ol>
        </div>
        <br />

        {params.id && (
          <div
            style={{
              borderBottom: "1px solid rgb(207, 204, 204)",
              borderTop: "1px solid rgb(207, 204, 204)",
              backgroundColor: "white",
            }}
          >
            <ol>
              <li
                className="editname"
                style={{
                  paddingLeft: "5px",
                  color: "red",
                  fontWeight: "normal",
                  paddingTop: "7px",
                }}
              >
                <Button
                  size="small"
                  style={{ fontSize: 11, color: "red" }}
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
                  Delete Contact
                </Button>
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
