import React, { useContext } from "react";
import formatProductPrice from "../utils/formatProductPrice";
import { Link } from "react-router-dom";
import Table from "./common/Table";
import Like from "./common/Like";
import UserContext from "../contexts/UserContext";

function PropertiesTable({ properties, onDelete, onLike, sortColumn, onSort }) {
  const currentUser = useContext(UserContext);

  const columns = [
    {
      path: "title",
      label: "Title",
      content: property => (
        <Link to={`/properties/${property._id}`}>{property.title}</Link>
      )
    },
    { path: "category.name", label: "Category" },
    { path: "description", label: "Description" },
    {
      key: "price",
      path: "price",
      label: "Price",
      content: property => formatProductPrice(property.price, property.currency)
    },
    {
      key: "like",
      content: property => (
        <Like liked={property.liked} onClick={() => onLike(property)} />
      )
    }
  ];

  const deleteColumn = {
    key: "delete",
    content: property => (
      <button
        onClick={() => onDelete(property)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  /**
   * If a user is an admin, show the delete button
   */
  if (currentUser && currentUser.isAdmin) columns.push(deleteColumn);

  return (
    <Table
      columns={columns}
      data={properties}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default PropertiesTable;
