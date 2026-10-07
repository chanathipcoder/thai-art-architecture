/* ==========================================================================
   ★ สคริปต์การทำงาน: ศิลปะลายรดน้ำและสถาปัตยกรรมไทย ★
   Thai Lacquer Art & Traditional Architecture Main JavaScript
   ========================================================================== */

// 1. Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// 2. Interactive Water Washing Simulator (จำลองการรดน้ำล้างลาย)
function simulateWaterWash() {
  const mask = document.getElementById('simMask');
  const btn = document.getElementById('washBtn');
  if (mask && btn) {
    btn.disabled = true;
    btn.innerText = '💦 กำลังรดน้ำล้างหรดาล...';
    btn.classList.add('opacity-50');
    
    mask.style.opacity = '0';
    mask.style.transform = 'scale(1.1)';
    mask.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.innerText = '✨ เผยลายทองคำสำเร็จ!';
      btn.classList.remove('opacity-50');
    }, 1000);
  }
}

function resetWaterWash() {
  const mask = document.getElementById('simMask');
  const btn = document.getElementById('washBtn');
  if (mask && btn) {
    mask.style.opacity = '1';
    mask.style.transform = 'scale(1)';
    mask.style.pointerEvents = 'auto';
    btn.disabled = false;
    btn.innerText = '💦 กดรดน้ำล้างลาย';
    btn.classList.remove('opacity-50');
  }
}

// 3. Interactive Architecture Diagram Tabs
const archData = {
  chofa: {
    title: 'ช่อฟ้า (Chofa) - ยอดสันหลังคา',
    desc: 'ประดิษฐาน ณ จุดสูงสุดของสันหลังคาอุโบสถและวิหาร เปรียบเสมือนยอดมงกุฎแห่งสถาปัตยกรรมวัดไทย ช่างโบราณนิยมแกะสลักเป็นรูปพญาครุฑยุดนาค เพื่อเป็นสัญลักษณ์แห่งการปกปักรักษาศาสนสถานอันศักดิ์สิทธิ์'
  },
  bairaka: {
    title: 'ใบระกา (Bai Raka) - ลายประดับแนวลาดหลังคา',
    desc: 'ชิ้นส่วนลายกนกที่เรียงต่อกันเป็นจังหวะตามแนวลาดของหลังคา เปรียบเสมือนครีบหรือเกล็ดอันวิจิตรของพญานาคที่ทอดตัวลงมาจากยอดช่อฟ้า ช่วยเสริมให้หลังคาดูมีมิติและพริ้วไหว'
  },
  hanghong: {
    title: 'หางหงส์ (Hang Hong) - ส่วนปลายล่างสุดของเครื่องลำยอง',
    desc: 'ส่วนปลายล่างสุดของกรอบหลังคาที่เชิดงอนขึ้นอย่างอ่อนช้อย มักทำเป็นรูปเศียรพญานาค ๓ เศียร หรือ ๕ เศียร ช่วยเชื่อมต่อสายตาจากแนวหลังคาลงสู่โครงสร้างเสาอาคารได้อย่างสมบูรณ์แบบ'
  },
  gable: {
    title: 'หน้าบัน (Gable / Pediment) - ศูนย์รวมประณีตศิลป์',
    desc: 'พื้นที่สามเหลี่ยมด้านหน้าและหลังอาคาร มักแกะสลักไม้ลายกระหนก ลงรักปิดทอง ประดับกระจกสี เล่าเรื่องราวนารายณ์ทรงสุบรรณ พระอินทร์ทรงช้างเอราวัณ หรือพุทธชาดก เชื่อมโยงกับศิลปะลายรดน้ำ'
  },
  corbel: {
    title: 'คันทวย (Corbels) - ไม้ค้ำยันหลังคาวิจิตร',
    desc: 'โครงสร้างไม้ค้ำยันที่ยื่นออกจากเสาหรือผนังเพื่อรองรับชายคา มักฉลุหรือแกะสลักเป็นรูปพญานาค ลายกนก หรือหนุมาน ช่วยเพิ่มความสง่างามและความมั่นคงแก่อาคาร'
  }
};

function showArchInfo(elementKey) {
  const titleEl = document.getElementById('archTitle');
  const descEl = document.getElementById('archDesc');
  const displayBox = document.getElementById('archInfoDisplay');

  if (archData[elementKey] && titleEl && descEl) {
    titleEl.innerText = archData[elementKey].title;
    descEl.innerText = archData[elementKey].desc;
    
    displayBox.classList.remove('animate-fadeIn');
    void displayBox.offsetWidth;
    displayBox.classList.add('animate-fadeIn');
  }
}

// 4. Filterable Gallery
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.gallery-filter-btn');

  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(category)) {
      btn.classList.add('active');
    }
  });

  items.forEach(item => {
    if (category === 'all') {
      item.style.display = 'block';
    } else {
      if (item.classList.contains(category)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    }
  });
}

// 5. Gallery Modal Details with Images
const galleryData = [
  {
    img: 'https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5?auto=format&fit=crop&w=800&q=80',
    tag: 'SCRIPTURE CABINET • สมัยอยุธยา',
    title: 'ตู้พระธรรมลายรดน้ำ ศิลปะอยุธยาตอนปลาย',
    desc: 'ตู้พระธรรมไม้ลงรักปิดทองลายรดน้ำ ตกแต่งด้วยลายพันธุ์พฤกษาและภาพสัตว์หิมพานต์ จัดแสดง ณ สำนักหอสมุดแห่งชาติ กรมศิลปากร สะท้อนความรุ่งเรืองของประณีตศิลป์ไทยในอดีต'
  },
  {
    img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
    tag: 'ARCHITECTURE • สถาปัตยกรรมวัดไทย',
    title: 'พระอุโบสถและหลังคาเครื่องลำยอง',
    desc: 'สถาปัตยกรรมพระอุโบสถทรงไทยประเพณี โครงสร้างหลังคาซ้อน ๓ ชั้น มุงกระเบื้องเคลือบสี พร้อมเครื่องลำยอง ช่อฟ้า ใบระกา และหางหงส์สีทองอร่ามตัดกับท้องฟ้า'
  },
  {
    img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    tag: 'THAI MOTIF • แม่ลายกนก',
    title: 'ลายกนกเปลวเพลิงทองคำแท้',
    desc: 'แม่ลายกนก ๓ ตัว (กนกสามตัว) ที่ผูกลายอย่างมีจังหวะ เส้นสายสะบัดพริ้วไหวคล้ายเปลวไฟ เขียนด้วยน้ำยาหรดาลและปิดทองคำเปลวบริสุทธิ์ 100%'
  },
  {
    img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    tag: 'TEMPLE DOOR • บานประตูพระอุโบสถ',
    title: 'บานประตูลงรักปิดทองลายทวารบาล',
    desc: 'ภาพทวารบาลหรือเทพยดาผู้พิทักษ์รักษาพระศาสนา สถิต ณ บานประตูพระอุโบสถหลวง รังสรรค์ด้วยเทคนิคลายรดน้ำที่มีความละเอียดอ่อนในทุกรายละเอียดของเครื่องทรง'
  },
  {
    img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
    tag: 'CARVED GABLE • หน้าบันวิจิตร',
    title: 'หน้าบันนารายณ์ทรงสุบรรณประดับกระจก',
    desc: 'งานแกะสลักไม้รูปพระนารายณ์ทรงครุฑยุดนาค ลงรักปิดทองคำเปลวและประดับกระจกสีเกรียบ สัญลักษณ์แห่งองค์พระมหากษัตริย์และพระพุทธศาสนา'
  },
  {
    img: 'https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5?auto=format&fit=crop&w=800&q=80',
    tag: 'MANUSCRIPT CHEST • หีบพระธรรมโบราณ',
    title: 'หีบพระธรรมลายรดน้ำ ๑๒ นักษัตร',
    desc: 'หีบสำหรับบรรจุพระคัมภีร์ใบลานสมัยอยุธยา อายุราว ๓๐๐–๔๐๐ ปี ตกแต่งลายพันธุ์พฤกษาล้อมรอบรูปสัตว์ประจำปีนักษัตรตามคติความเชื่อโบราณ'
  }
];

function openGalleryModal(index) {
  const item = galleryData[index];
  if (!item) return;

  const modalImg = document.getElementById('modalImg');
  if (modalImg) {
    modalImg.src = item.img;
  }
  document.getElementById('modalTag').innerText = item.tag;
  document.getElementById('modalTitle').innerText = item.title;
  document.getElementById('modalDesc').innerText = item.desc;

  const modal = document.getElementById('galleryModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeGalleryModal() {
  const modal = document.getElementById('galleryModal');
  modal.classList.remove('flex');
  modal.classList.add('hidden');
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('galleryModal');
  if (e.target === modal) {
    closeGalleryModal();
  }
});