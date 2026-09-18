# ASA'S FUTURE TUTORING CENTRE

**Supporting Learners to Achieve Academic Success**

**LEARN • GROW • SUCCEED**

---

## 1. Project Overview

Asa's Future Tutoring Centre is a fictional tutoring centre website developed as part of a web-development project.

The purpose of the website is to provide learners and parents with information about the tutoring centre, academic subjects, tutoring services, online tutoring, enquiry options and contact information.

The website demonstrates the use of:

* HTML5
* CSS3
* Forms
* Images
* Website navigation
* Responsive web design
* Accessibility principles
* Git and GitHub
* GitHub Pages

---

## 2. Organisation Information

**Organisation:** Asa's Future Tutoring Centre

**Established:** 2022

**Location:** Gqeberha, Eastern Cape, South Africa

**Tagline:** Supporting Learners to Achieve Academic Success

**Slogan:** LEARN • GROW • SUCCEED

Asa's Future Tutoring Centre provides affordable and accessible academic support to learners. The centre focuses on personalised tutoring, revision, examination preparation and online tutoring.

---

## 3. Website Purpose

The website was developed to:

* Introduce Asa's Future Tutoring Centre.
* Provide information about the organisation.
* Display the academic subjects offered.
* Explain the tutoring services available.
* Provide an online tutoring option.
* Allow learners and parents to submit enquiries.
* Provide contact information.
* Provide links to social-media platforms.
* Provide location information through a map.
* Demonstrate practical web-development skills.

---

## 4. Target Audience

The main target users of the website are:

* School learners.
* Parents and guardians.
* Learners looking for additional academic support.
* Learners preparing for examinations.
* People interested in online tutoring services.

---

## 5. Website Pages

The website consists of the following main pages:

1. **Home** – `index.html`
2. **About Us** – `pages/about.html`
3. **Services** – `pages/services.html`
4. **Enquiry** – `pages/enquiry.html`
5. **Contact** – `pages/contact.html`

The homepage is located in the root directory, while the remaining HTML pages are stored inside the `pages` folder.

---

## 6. Website Folder Structure

The final project uses the following structure:

```text
Asa-s_Future_Tutoring_Centre/
│
├── index.html
├── README.md
│
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── enquiry.html
│   └── contact.html
│
├── assets/
│   ├── asa-future-tutoring-logo.png
│   ├── mathematics.jpg
│   ├── life-science.jpg
│   └── online-tutoring.jpg
│
└── css/
    └── style.css
```

The folder names are written in lowercase to reduce problems caused by differences between uppercase and lowercase file paths.

---

## 7. Site Hierarchy

The website follows a simple hierarchical structure:

```text
                    ASA'S FUTURE TUTORING CENTRE
                              |
        ------------------------------------------------
        |          |          |          |             |
       HOME      ABOUT     SERVICES   ENQUIRY       CONTACT
        |          |          |          |             |
     index.html    |          |       Form fields   Contact details
                   |          |
              Organisation   Academic Subjects
              Information    |
              Mission        -------------------------
              Vision         |      |      |         |
              Values        Maths  Physical  Life    Online
                            Sciences Sciences Tutoring
```

---

## 8. Navigation

The navigation menu allows users to move between the main pages of the website.

Because the homepage is located in the root directory and the other pages are located inside the `pages` folder, relative paths must be used correctly.

For example, from the homepage:

```html
<a href="pages/about.html">About Us</a>
```

From a page inside the `pages` folder, the link back to the homepage is:

```html
<a href="../index.html">Home</a>
```

The `../` moves one level up from the `pages` folder to the root directory.

This structure prevents incorrect paths such as:

```text
Cannot GET /pages/index.html
```

---

## 9. Images and Assets

Images used by the website are stored inside the `assets` folder.

Examples include:

* `asa-future-tutoring-logo.png`
* `mathematics.jpg`
* `life-science.jpg`
* `online-tutoring.jpg`

From the homepage, an image can be referenced using:

```html
<img src="assets/asa-future-tutoring-logo.png" alt="Asa's Future Tutoring Centre logo">
```

From a page inside the `pages` folder, the correct path is:

```html
<img src="../assets/asa-future-tutoring-logo.png" alt="Asa's Future Tutoring Centre logo">
```

Using the correct relative path ensures that images are loaded correctly.

---

## 10. Forms and Accessibility

Forms are included on the Enquiry and Contact pages.

Form labels are included to clearly identify the information that users are expected to enter.

For example:

```html
<label for="name">Full Name:</label>
<input type="text" id="name" name="name">
```

The `for` attribute of the label corresponds to the `id` of the input field.

This improves usability and accessibility because users can clearly identify what information should be entered into each field.

Other form controls may include:

* Text fields.
* Email fields.
* Telephone fields.
* Selection controls.
* Text areas.
* Submit buttons.

---

# WEBSITE DESIGN

## 11. Website Design Principles

The website was designed using several basic web-design principles.

### Consistency

The navigation structure and general design are kept consistent across the pages.

### Simplicity

Information is presented in a straightforward manner so that users can easily understand the content.

### Accessibility

Content, images and forms are designed to be usable by a broad range of visitors.

### Visual Hierarchy

Headings, sections and images help users identify important information.

### Usability

Navigation links and forms are arranged so that users can find information and submit information easily.

---

## 12. Website Content

The website provides information about the following areas.

### Academic Subjects

* Mathematics
* Physical Sciences
* Life Sciences
* English
* Accounting
* Business Studies
* CAT

### Tutoring Services

* Subject tutoring.
* Revision.
* Examination preparation.
* Personalised academic support.
* Online tutoring.

### Contact Services

* Enquiry form.
* Contact form.
* Telephone information.
* Social-media platforms.
* Location/map.

---

## 13. Online Tutoring

Online tutoring was included as one of the services provided by Asa's Future Tutoring Centre.

Online tutoring allows learners to receive academic support without necessarily attending a physical tutoring location.

The website includes information and an image representing the online-tutoring service.

---

# PROJECT INFORMATION

## 14. Git and GitHub

Git and GitHub were used to manage the project source code.

### Git was used for:

* Tracking changes.
* Creating commits.
* Maintaining project versions.
* Recording development progress.

### GitHub was used for:

* Hosting the repository.
* Storing the project online.
* Managing project files.
* Publishing the website through GitHub Pages.

**Repository:** `Asa-s_Future_Tutoring_Centre`

**GitHub Account:** `Asamkelisiwe-Madikane`

---

## 15. GitHub Pages Deployment

The website was prepared for deployment using GitHub Pages.

The homepage file is located in the root directory:

```text
index.html
```

The other website pages are located inside:

```text
pages/
```

The GitHub Pages website is:

[Asa's Future Tutoring Centre – GitHub Pages](https://asamkelisiwe-madikane.github.io/?utm_source=chatgpt.com)

GitHub Pages uses `index.html` as the default homepage when the website root is opened.

---

## 16. Version Control and Commits

Git commits were used throughout development to keep track of changes.

Examples of changes that can be recorded through commits include:

* Created initial website structure.
* Added homepage.
* Added About Us page.
* Added Services page.
* Added Enquiry page.
* Added Contact page.
* Added images and assets.
* Added CSS styling.
* Added responsive design.
* Corrected navigation paths.
* Corrected image paths.
* Updated website content.
* Prepared website for GitHub Pages.

Using commits makes it possible to track the development history of the website and identify changes made during development.

---

## 17. GitHub Repository

The project repository contains the website source files and supporting documentation.

The repository contains:

```text
index.html
pages/
assets/
css/
README.md
```

The repository is intended to remain public so that the website can be accessed and assessed.

---

# PROJECT CHALLENGES AND SOLUTIONS

## 18. Project Challenges and Solutions

During development, several common website-development issues were identified and addressed.

| Challenge                       | Solution                                                 |
| ------------------------------- | -------------------------------------------------------- |
| Homepage not loading            | Ensure `index.html` is located in the repository root    |
| Page links not working          | Use the correct relative file paths                      |
| Images not displaying           | Check `assets/` paths and filenames                      |
| CSS not loading                 | Check the stylesheet path                                |
| Different folder capitalisation | Use consistent lowercase folder names                    |
| GitHub Pages 404 error          | Check repository structure and GitHub Pages settings     |
| Broken navigation               | Test links from every page                               |
| Mobile layout problems          | Use responsive CSS                                       |
| Incorrect image paths           | Use the correct relative path based on the page location |

---

## 19. Technologies Used

| Technology   | Purpose                                       |
| ------------ | --------------------------------------------- |
| HTML5        | Website structure and content                 |
| CSS3         | Website styling, layout and responsive design |
| Git          | Version control                               |
| GitHub       | Repository hosting                            |
| GitHub Pages | Website deployment                            |
| Web Browser  | Website testing                               |

---

## 20. Project Outcome

The completed project provides a structured and user-friendly website for the fictional Asa's Future Tutoring Centre.

The website demonstrates the practical application of:

* HTML.
* CSS.
* Web-page structure.
* Navigation.
* Forms.
* Images.
* Responsive design.
* Accessibility.
* Version control.
* GitHub.
* GitHub Pages.

The final website provides learners and parents with information about the organisation, tutoring services, academic subjects, online tutoring, enquiries and contact options.

---

# REFERENCES

## 21. References

The following resources were consulted for general web-development information and technical guidance.

### HTML

Mozilla Developer Network (MDN). 2026. *HTML: HyperText Markup Language*. Available at:
[MDN HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML?utm_source=chatgpt.com)
Accessed: 15 September 2026.

### CSS

Mozilla Developer Network (MDN). 2026. *CSS: Cascading Style Sheets*. Available at:
[MDN CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS?utm_source=chatgpt.com)
Accessed: 15 September 2026.

### Web Accessibility

World Wide Web Consortium (W3C). 2026. *Web Accessibility Initiative*. Available at:
[W3C Web Accessibility Initiative](https://www.w3.org/WAI/?utm_source=chatgpt.com)
Accessed: 15 September 2026.

### GitHub

GitHub. 2026. *GitHub Documentation*. Available at:
[GitHub Documentation](https://docs.github.com/?utm_source=chatgpt.com)
Accessed: 15 September 2026.

### GitHub Pages

GitHub. 2026. *What is GitHub Pages?* Available at:
[GitHub Pages Documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages?utm_source=chatgpt.com)
Accessed: 15 September 2026.

### HTML Validation

World Wide Web Consortium (W3C). 2026. *Markup Validation Service*. Available at:
[W3C Markup Validation Service](https://validator.w3.org/?utm_source=chatgpt.com)
Accessed: 15 September 2026.

### CSS Validation

World Wide Web Consortium (W3C). 2026. *CSS Validation Service*. Available at:
[W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/?utm_source=chatgpt.com)
Accessed: 15 September 2026.

---

# AUTHOR INFORMATION

## 22. Author

**Student:** Asamkelisiwe Madikane

**Student Number:** ST10519703

**Project:** Asa's Future Tutoring Centre

**Year:** 2026

**Slogan:** LEARN • GROW • SUCCEED

**Tagline:** Supporting Learners to Achieve Academic Success
