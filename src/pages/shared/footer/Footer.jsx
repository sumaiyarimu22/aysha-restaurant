const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-6'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <h2 className='text-xl font-bold'>Contact Information</h2>
            <p>
              Email:{" "}
              <a
                href='mailto:sumaiyarimu22@gmail.com'
                className='text-blue-400 hover:underline'
              >
                sumaiyarimu22@gmail.com
              </a>
            </p>
          </div>
          <div className='mb-4 md:mb-0'>
            <h2 className='text-xl font-bold'>Follow Us</h2>
            <div className='flex space-x-4'>
              <a
                href='https://www.facebook.com/sumaiya.rimu.313'
                className='hover:text-blue-400'
              >
                Facebook
              </a>
              <a
                href='https://x.com/SumaiyRimu'
                className='hover:text-blue-400'
              >
                Twitter
              </a>
            </div>
          </div>
          <div>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
