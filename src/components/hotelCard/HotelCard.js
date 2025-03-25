import Link from "next/link";
import styles from "./page.module.css";

const HotelCard = ({ data }) => {
  const hotel = data?.hotel;

  return (
    <Link
      href={`/hotels/${hotel?.category}/${hotel?._id}`}
      className={styles.card1}
    >
      <img className={styles.propertyImageIcon} alt="" src={hotel?.image[0]} />
      <div style={{ paddingLeft: "6px", paddingTop: "4px" }}>
        <h3>{hotel?.name}</h3>
        <div
          style={{ marginTop: "15px", display: "flex", alignItems: "center" }}
        >
          <img className={styles.mappinIcon} alt="" src="/placeholder.png" />
          <p style={{ marginLeft: "5px" }}>{hotel?.nearest}</p>
        </div>
        <h2 style={{ marginTop: "10px" }}>
          $ {hotel?.price}{" "}
          <span style={{ fontSize: "14px", color: "grey", fontWeight: "400" }}>
            / night
          </span>
        </h2>
      </div>
    </Link>
  );
};

export default HotelCard;
