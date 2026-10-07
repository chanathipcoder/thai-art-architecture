/* =====================================
   Thai Lacquer Art & Architecture
   Menu · Water Wash · Architecture Tabs
   ===================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupWaterWash();
  setupArchitectureTabs();
  setupImageFallbacks();
});

/* 1. เมนูมือถือ */
function setupMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mainMenu");

  if (!toggle || !menu) return;

  function setMenuOpen(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "ปิดเมนู" : "เปิดเมนู"
    );
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!open);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      toggle.getAttribute("aria-expanded") === "true" &&
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  const desktop = window.matchMedia("(min-width: 901px)");

  desktop.addEventListener("change", (event) => {
    if (event.matches) setMenuOpen(false);
  });
}

/* 2. ตัวจำลองรดน้ำเผยลาย */
function setupWaterWash() {
  const washButton = document.getElementById("washBtn");
  const resetButton = document.getElementById("resetBtn");
  const mask = document.getElementById("simMask");
  const status = document.getElementById("washStatus");

  if (!washButton || !resetButton || !mask || !status) return;

  const stage = mask.closest(".wash-stage");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let washTimer = null;

  washButton.addEventListener("click", () => {
    window.clearTimeout(washTimer);

    washButton.disabled = true;
    washButton.textContent = "กำลังเผยลาย…";
    status.textContent = "กำลังจำลองการล้างน้ำยาออก";
    stage.classList.add("is-washed");

    const duration = reducedMotion.matches ? 0 : 1200;

    washTimer = window.setTimeout(() => {
      washButton.textContent = "เผยลายทองแล้ว";
      status.textContent = "เผยลายทองสำเร็จ กดเริ่มใหม่เพื่อดูอีกครั้ง";
      washTimer = null;
    }, duration);
  });

  resetButton.addEventListener("click", () => {
    window.clearTimeout(washTimer);
    washTimer = null;

    stage.classList.remove("is-washed");
    washButton.disabled = false;
    washButton.textContent = "รดน้ำเผยลาย";
    status.textContent = "พร้อมเริ่มจำลอง";
  });
}

/* 3. ข้อมูลสถาปัตยกรรม */
const architectureData = {
  chofa: {
    title: "ช่อฟ้า / Chofa",
    position: "หมายเลข 1 ในแผนภาพ",
    description:
      "ส่วนยอดที่ปลายสันหลังคา รูปทรงแตกต่างกันตามแบบและสกุลช่าง " +
      "ไม่ใช่ทุกช่อฟ้าที่ทำเป็นครุฑยุดนาค"
  },

  bairaka: {
    title: "ใบระกา / Bai Raka",
    position: "หมายเลข 2 ในแผนภาพ",
    description:
      "องค์ประกอบที่เรียงตามแนวลาดของเครื่องลำยอง " +
      "สร้างจังหวะต่อเนื่องตามเส้นกรอบหลังคา " +
      "และช่วยเน้นความละเอียดของงานตกแต่ง"
  },

  hanghong: {
    title: "หางหงส์ / Hang Hong",
    position: "หมายเลข 6 ในแผนภาพ",
    description:
      "ส่วนปลายล่างของเครื่องลำยองที่เชิดขึ้น " +
      "มีรูปแบบแตกต่างกันตามงานช่าง " +
      "บางแบบทำเป็นรูปนาค โดยจำนวนเศียรไม่ได้เหมือนกันทุกอาคาร"
  },

  gable: {
    title: "หน้าบัน / Gable",
    position: "พื้นที่สามเหลี่ยมใต้กรอบหลังคา",
    description:
      "พื้นที่ด้านหน้าและด้านหลังใต้กรอบหลังคา " +
      "มักตกแต่งด้วยงานแกะสลัก ลงรักปิดทอง หรือประดับกระจก " +
      "เทคนิคเหล่านี้ต้องแยกจากลายรดน้ำ"
  }
};

/* 4. แท็บสถาปัตยกรรม */
function setupArchitectureTabs() {
  const tabs = Array.from(
    document.querySelectorAll("[data-arch]")
  );

  const panel = document.getElementById("archPanel");
  const title = document.getElementById("archTitle");
  const position = document.getElementById("archPosition");
  const description = document.getElementById("archDesc");

  if (
    !tabs.length ||
    !panel ||
    !title ||
    !position ||
    !description
  ) {
    return;
  }

  function selectTab(key, moveFocus = false) {
    const data = architectureData[key];
    if (!data) return;

    title.textContent = data.title;
    position.textContent = data.position;
    description.textContent = data.description;

    tabs.forEach((tab) => {
      const selected = tab.dataset.arch === key;

      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;

      if (selected) {
        panel.setAttribute("aria-labelledby", tab.id);

        if (moveFocus) {
          tab.focus();
        }
      }
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      selectTab(tab.dataset.arch);
    });

    tab.addEventListener("keydown", (event) => {
      let nextIndex;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (index + 1) % tabs.length;
          break;

        case "ArrowLeft":
          nextIndex = (index - 1 + tabs.length) % tabs.length;
          break;

        case "Home":
          nextIndex = 0;
          break;

        case "End":
          nextIndex = tabs.length - 1;
          break;

        default:
          return;
      }

      event.preventDefault();
      selectTab(tabs[nextIndex].dataset.arch, true);
    });
  });

  selectTab("chofa");
}

/* 5. แสดงข้อความเมื่อโหลดภาพไม่ได้ */
function setupImageFallbacks() {
  document.querySelectorAll("img").forEach((image) => {
    function showFallback() {
      if (!image.isConnected) return;

      const fallback = document.createElement("div");
      fallback.className = "image-error";
      fallback.textContent =
        "ไม่สามารถโหลดภาพ: " + (image.alt || "ภาพประกอบ");

      image.replaceWith(fallback);
    }

    image.addEventListener("error", showFallback, { once: true });

    if (image.complete && image.naturalWidth === 0) {
      showFallback();
    }
  });
}