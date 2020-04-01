import React, { useState, useContext, useEffect } from "react";
import PropertiesTable from "./PropertiesTable";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import UserContext from "../contexts/UserContext";
import SearchBox from "./SearchBox";
import { getProperties, deleteProperty } from "../services/PropertiesService";
import { getCategories } from "../services/CategoryService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import paginate from "../utils/paginate";
import _ from "lodash";

function Properties(props) {
  /**
   * Use user context.
   *
   * @const {object}
   */
  const currentUser = useContext(UserContext);

  /**
   * Properties.
   *
   * @const {object}
   */
  const [properties, setProperties] = useState([]);

  /**
   * Categories.
   *
   * @const {object}
   */
  const [categories, setCategories] = useState([]);

  /**
   * Search query state.
   *
   * When we work with a controled componenent, we can not use "null" or "undefined"!!!
   * Otherwise, React think's we are working with an uncontroled component.
   *
   * @const {object}
   */
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Categories state.
   *
   * @const {object}
   */
  const [selectedCategory, setSelectedCategory] = useState(null);

  /**
   * Sort state.
   *
   * @const {object}
   */
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  /**
   * Current page.
   *
   * @const {object}
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Page size.
   *
   * @const {object}
   */
  const [pageSize] = useState(4);

  /**
   * Fetch data on component mount cycle.
   *
   * @returns
   */
  useEffect(() => {
    /**
     * Fetch the data.
     */
    async function fetchData() {
      const { data } = await getCategories();

      const categories = [{ _id: "", name: "All categories" }, ...data];
      setCategories(categories);

      const { data: properties } = await getProperties();
      setProperties(properties);
    }

    fetchData();
  }, [setCategories, setProperties]);

  /**
   * Handle delete property.
   *
   * @param {object} property
   * @returns
   */
  const handleDelete = async property => {
    const originalProperty = properties;

    const filteredProperties = originalProperty.filter(
      p => p._id !== property._id
    );

    setProperties(filteredProperties);

    try {
      await deleteProperty(property._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This property has already been deleted.");

      // Something failed!
      // roll back to the original state
      setProperties(originalProperty);
    }
  };

  /**
   * Handle like property.
   *
   * @param {object} property
   * @returns
   */
  const handleLike = property => {
    const likedProperties = [...properties];
    const index = properties.indexOf(property);

    likedProperties[index] = { ...properties[index] };
    likedProperties[index].liked = !properties[index].liked;

    setProperties(likedProperties);
  };

  /**
   * Handle page change.
   *
   * @param {object} page
   * @returns
   */
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  /**
   * Handle category select.
   *
   * @param {object} category
   * @returns
   */
  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchQuery(null);
  };

  /**
   * Handle sorting.
   *
   * @param {object} path
   * @returns
   */
  const handleSort = sortColumn => {
    setSortColumn(sortColumn);
  };

  /**
   * Handle search.
   *
   * @param {string} query
   * @returns
   */
  const handleSearch = query => {
    setCurrentPage(1);
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  /**
   * If invalid, return a paragraph
   *
   * @return string
   */
  if (properties.length === 0) return <p>No properties in the data base</p>;

  let filtered = properties;
  if (searchQuery)
    filtered = properties.filter(p =>
      p.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  else if (selectedCategory && selectedCategory._id)
    filtered = properties.filter(p => p.category._id === selectedCategory._id);

  /**
   * Sort order.
   *
   * @const {object}
   */
  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  /**
   * Paginate data.
   *
   * @const {object}
   */
  const paginateProperties = paginate(sorted, currentPage, pageSize);

  /**
   * This components are at the same level of asbtractions
   */
  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={categories}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
        />
      </div>
      <div className="col">
        {currentUser && (
          <Link
            to="/properties/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New property
          </Link>
        )}
        <p>Showing {filtered.length} properties in the database.</p>
        <SearchBox name={setSearchQuery} onChange={handleSearch} />
        <PropertiesTable
          properties={paginateProperties}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Properties;
