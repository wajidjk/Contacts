import { Input, InputAdornment } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { Fragment, useContext, useState } from "react";
import { ContactStore } from "../store/contact";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

function Contacts() {
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useQuery(
    "contacts",
    async () => {
      console.log("fetching all contact");
      const response = await fetch("http://localhost:5000/api/contacts");
      return (await response.json()).contacts;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <span>loading</span>;
  console.log(search);
  let filteredData = data;
  if (search && data) {
    filteredData = data.filter(
      (el) =>
        el.name.toLowerCase().includes(search.toLowerCase()) ||
        el.lastname.toLowerCase().includes(search.toLowerCase())
    );
  }

  const groupedContactsMap = filteredData.reduce(
    (acc, { name, lastname, _id }) => {
      let _category = name.charAt(0);
      let _arr = acc[_category] || [];

      let _name = name;
      if (lastname) _name = _name + " " + lastname;
      _arr.push({
        name: _name,
        id: _id,
      });

      return { ...acc, [_category]: _arr };
    },
    {}
  );

  const groupedContactsMarkup = Object.keys(groupedContactsMap)
    .sort((a, b) => a.localeCompare(b))
    .map((el) => {
      return (
        <Fragment>
          <li className="category">{el}</li>
          <ol className="ol">
            {groupedContactsMap[el].map(({ name, id }) => (
              <Link style={{ textDecoration: "none" }} to={`/contact/${id}`}>
                <li className="li" onClick={() => {}}>
                  {name}
                </li>
              </Link>
            ))}
          </ol>
        </Fragment>
      );
    });

  return (
    <div className="main_div">
      <div className="center_div" style={{ backgroundColor: "white" }}>
        <div className="card">
          <a className="group">Groups</a>
          <h3 className="contact">Contacts</h3>

          <Link
            style={{
              textDecoration: "none",
              color: "rgb(26, 40, 240)",
              fontSize: "17px",
            }}
            to={`/new-contact/`}
          >
            +
          </Link>
        </div>
        <Autocomplete
          id="combo-box-demo"
          size="small"
          popupIcon={null}
          options={[]}
          getOptionLabel={(option) => option.title}
          style={{
            width: 275,
            borderRadius: "100px",
            backgroundColor: "rgb(226, 224, 224)",
          }}
          renderInput={(params) => (
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{
                paddingLeft: 20,
                paddingRight: 20,
              }}
              {...params}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              placeholder="Search"
              variant="standard"
            />
          )}
        />
        <article class="cardd">
          <div class="image">
            <img
              src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI"
              alt=""
            />
          </div>
          <div class="body">
            <h4>Wajid JK</h4>
            <h5 style={{ color: "gray", fontWeight: "lighter" }}>My Card</h5>
          </div>
        </article>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "350px",
            overflow: "auto",
          }}
        >
          {groupedContactsMarkup}
        </div>
      </div>
    </div>
  );
}

export { Contacts };
