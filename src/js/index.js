import "./import/modules";
import "./import/components";

import lozad from "lozad";

const titleImg = document.querySelectorAll(".lozad");
const observerTitle = lozad(titleImg);
observerTitle.observe();
