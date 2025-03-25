import styles from "./page.module.css";
import Link from "next/link";

const PackageCard = ({ data }) => {
  const days = data?.package?.days;
  const Package = data?.package;
  const np = (
    Package?.price -
    (data?.package?.discount / 100) * Package?.price
  ).toFixed(0);

  const short = Package?.name?.replace(/(.{40})..+/, "$1");
  return (
    <Link className={styles.card1} href={`/packages/${Package?._id}`}>
      <div style={{ position: "relative", width: "100%" }}>
        <img
          className={styles.propertyImageIcon}
          alt=""
          src={Package?.image[0]}
        />
        <div className={styles.daysWrapper}>{days} Days</div>
      </div>
      <div className={styles.propertyName}>
        <h3 className={styles.alliumPlaceOrlando}>{short}</h3>
      </div>
      <div className={styles.priceWrapper}>
        {data?.package?.discount > 0 && (
          <div className={styles.cutPrice}>
            <span className={styles.redLine}></span>$ {Package?.price}
          </div>
        )}

        <div className={styles.price2Mobile}>
          <div className={styles.price}>
            <div className={styles.div}> $ {np}</div>
          </div>

          <p style={{ color: "#9b9b9" }}>per person</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.user}>
          <img className={styles.userChild} alt="" src="/guide.png" />
          <div className={styles.jennyWilson}>{Package?.guide}</div>
        </div>
        {/* <div className={styles.ctas}>
          <div className={styles.share}>
            <img
              className={styles.sharenetworkIcon}
              alt=""
              src="/sharenetwork.svg"
            />
          </div>
        </div> */}
      </div>
    </Link>
  );
};

export default PackageCard;
