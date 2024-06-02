const Contact = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md text-center'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>
          Contact Information
        </h2>
        <p className='text-lg text-gray-700'>
          Email:{" "}
          <a
            href='mailto:sumaiyarimu22@gmail.com'
            className='text-blue-500 hover:underline'
          >
            sumaiyarimu22@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
