import hero from "../assets/images/hero.png";
import ProductsLayout from "./ProductsLayout";

export default function Home() {
  return (
    <div>
      <img style={{ width: "100%" }} src={hero} />
      <ProductsLayout />
    </div>
  );
}
