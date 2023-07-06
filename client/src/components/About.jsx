import style from "../styles/About.module.css";

const About = () => {
  return (
    <div className={style.About}>
    <div className={style.container}>
      <h1 className={style.title}>Henry Countries Project</h1>
      <h2 className={style.subtitle}>Created by Rodrigo Gonzalez</h2>
      <p className={style.description}>
        Welcome to the Henry Country Project, a demo project for the Henry
        bootcamp. This project was created using the skills and knowledge learned during the bootcamp.
      </p>
      <div className={style.links}>
        <a
          className={style.link}
          href="https://www.linkedin.com/in/rodrigogonzalezoliver/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
    </div>
  );
};

export default About;