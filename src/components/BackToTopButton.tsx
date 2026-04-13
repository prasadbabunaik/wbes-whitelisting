"use client";

const BackToTopButton = () => {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="btn btn-danger btn-icon landing-back-top"
      id="back-to-top"
    >
      <i className="ri-arrow-up-line"></i>
    </button>
  );
};

export default BackToTopButton;
