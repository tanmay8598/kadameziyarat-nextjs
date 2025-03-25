import Link from "next/link";
import styles from "./page.module.css";

const PropertyList = ({ categories }) => {
  return (
    <div className={styles.pList}>
      {categories?.map((item, id) => {
        return (
          <Link
            className={styles.pListItem}
            key={id}
            href={`/hotels/${item._id}`}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
              alt=""
              className={styles.pListImg}
            />
            <div className={styles.pListTitles}>
              <h1>{item?.name}</h1>
              <h2>233 hotels</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PropertyList;
