import SectionsTitle from "../../../Components/SectionTitles/SectionsTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className='my-20'>
      <SectionsTitle
        heading={"Testimonials"}
        subHeading={"What our Client say"}
      />

      <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className='flex flex-col items-center my-24 mx-48'>
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className='py-8'>{review.details}</p>
              <h3 className='text-2xl text-yellow-600'>{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
