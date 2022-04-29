import { Link } from 'gatsby';

const Footer = () => {
  return (
    <footer className="py-6 text-center text-sm leading-6 text-slate-500">
      <p>
        <span className="hidden">Copyright </span>© {new Date().getFullYear()}{' '}
        <span className="hidden">All rights reserved by </span>
        image-resize.com | <Link to="/privacy-policy">Privacy Policy</Link>
      </p>
    </footer>
  );
};

export default Footer;
