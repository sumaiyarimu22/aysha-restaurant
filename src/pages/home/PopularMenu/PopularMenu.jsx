// import { useEffect, useState } from "react";
import SectionsTitle from "../../../Components/SectionTitles/SectionsTitle";
import useMenu from "../../../hooks/useMenus";
import MenuItem from "../../shared/menuItem/MenuItem/MenuItem";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  console.log(menu, popular);
  return (
    <section className='my-20'>
      <SectionsTitle heading={"From our menu"} subHeading={"Popular items"} />

      <div className='grid md:grid-cols-2 gap-10'>
        {popular.map((item) => (
          <MenuItem item={item} key={item._id} />
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
