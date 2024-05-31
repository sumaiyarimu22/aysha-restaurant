const SectionsTitle = ({ heading, subHeading }) => {
  return (
    <div className='mx-auto text-center md:w-5/12 my-8'>
      <p className='text-yellow-400 mb-2'>---{subHeading}---</p>
      <h3 className='text-4xl uppercase border-y-4 py-4'>{heading}</h3>
    </div>
  );
};

export default SectionsTitle;
