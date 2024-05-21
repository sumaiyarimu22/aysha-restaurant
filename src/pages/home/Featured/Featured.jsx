import SectionsTitle from "../../../Components/SectionTitles/SectionsTitle";
import "./Featured.css";
import featuredimg from "../../../assets/home/featured.jpg";

const Featured = () => {
  return (
    <div className='featured-item bg-fixed my-20 pt-10'>
      <SectionsTitle heading={"Featured item"} subHeading={"check it out"} />

      <div className='md:flex justify-center items-center pb-20  pt-10 px-36 text-white'>
        <div>
          <img src={featuredimg} alt='' />
        </div>
        <div className='md:ml-10'>
          <p>Aug 20, 2029</p>
          <p className='uppercase'>Where can i get some?</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad at rerum
            vitae assumenda? Veniam voluptates itaque consequatur at
            perspiciatis labore odit provident molestiae vel? Nam amet suscipit
            doloremque, in voluptatem culpa vitae deserunt expedita numquam
            quibusdam natus dolorum, voluptatibus assumenda?
          </p>
          <button className='btn btn-outline border-0 border-b-4'>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
