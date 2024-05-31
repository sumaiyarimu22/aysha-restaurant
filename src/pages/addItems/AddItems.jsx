import { useForm } from "react-hook-form";
import SectionsTitle from "../../Components/SectionTitles/SectionsTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_key}`;

const AddItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // img upload the imgbb and then get the img url
    const imgFile = { image: data.image[0] };
    const res = await axiosPublic.post(img_hosting_api, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server the img url

      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.post("/menu", menuItem);
      if (menuRes.data.insertedId) {
        // show success popup
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${data.name} successfully added `,
          showConfirmButton: false,
          timer: 1500,
        });

        reset();
      }
    }
  };

  return (
    <div>
      <SectionsTitle heading='ADD AN ITEM' subHeading='Whats new?' />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-4xl p-10 bg-[#F3F3F3] mx-auto flex flex-col gap-5'
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='name'>Recipe name*</label>
          <input
            {...register("name", { required: true })}
            type='text'
            name='name'
            id='name'
            placeholder='Recipe Name'
            className='input input-bordered w-full'
          />
          {errors.name && (
            <span className='text-red-500'>Name field is required</span>
          )}
        </div>

        <div className='flex justify-between gap-5'>
          <div className='w-full flex flex-col gap-2'>
            <label htmlFor='category'>Category*</label>
            <select
              {...register("category", { required: true })}
              className='select select-bordered w-full'
              name='category'
              id='category'
              defaultValue=''
            >
              <option value='' disabled>
                Select a category
              </option>
              {["salad", "pizza", "soup", "dessert", "drinks"].map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
            {errors.category && (
              <span className='text-red-500'>Category field is required</span>
            )}
          </div>

          <div className='w-full flex flex-col gap-2'>
            <label htmlFor='price'>Price*</label>
            <input
              {...register("price", { required: true })}
              type='number'
              name='price'
              id='price'
              placeholder='Price'
              className='input input-bordered w-full'
            />
            {errors.price && (
              <span className='text-red-500'>Price field is required</span>
            )}
          </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='recipe'>Recipe Details*</label>
          <textarea
            {...register("recipe", { required: true })}
            className='textarea textarea-bordered w-full'
            rows={6}
            placeholder='Recipe Details'
            id='recipe'
            name='recipe'
          ></textarea>
          {errors.recipe && (
            <span className='text-red-500'>
              Recipe details field is required
            </span>
          )}
        </div>

        <div className='form-control w-full my-6'>
          <input
            {...register("image", { required: true })}
            type='file'
            className='file-input w-full max-w-xs'
          />
        </div>

        <div>
          <button
            className='bg-[#B58130] text-white py-3 px-6 rounded'
            type='submit'
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItems;
