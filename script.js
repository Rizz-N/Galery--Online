const { Client, Storage, ID, Permission, Role } = Appwrite;

const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('682e2d160029e5107ad0');

const storage = new Appwrite.Storage(client);
const bucketId = '682e2ef40025e30d04b7';
const projectId = '682e2d160029e5107ad0';

async function loadGallery() {
  try {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    let allFiles = [];
    let nextCursor = undefined;

    while (true) {
      const queries = [
        Appwrite.Query.limit(100),
        ...(nextCursor ? [Appwrite.Query.cursorAfter(nextCursor)] : [])
      ];

      const result = await storage.listFiles(
        bucketId,
        queries
      );

      allFiles.push(...result.files);
      nextCursor = result.nextCursor;

      console.log("File dalam batch ini:", result.files.length);
      console.log("Cursor berikutnya:", nextCursor);

      allFiles.forEach(file => {
      const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${file.$id}/view?project=682e2d160029e5107ad0`;
      gallery.innerHTML += `
        <div class="item">
          <img src="${imageUrl}" alt="${file.name}">
        </div>
      `;
    });
    
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close");
    const downloadLink = document.querySelector(".download");

    // Modal klik gambar
    gallery.addEventListener("click", e => {
      if (e.target.tagName === "IMG") {
        modal.style.display = "block";
        modalImg.src = e.target.src;
        document.body.classList.add("no-scroll");

        window.history.pushState({ modalOpen: true }, "", "#modal");

        const src = e.target.src;
      const match = src.match(/\/files\/(.*?)\/view/);

      if (match && match[1]) {
      const fileId = match[1];

      // Cari nama file dari allFiles
      const fileObj = allFiles.find(f => f.$id === fileId);
      const fileName = fileObj ? fileObj.name : 'downloaded_file';

      // Bersihkan event listener sebelumnya
      downloadLink.onclick = null;

      // Pasang event listener baru
      downloadLink.onclick = (ev) => {
        ev.preventDefault();
        downloadFile(fileId, fileName);
      };
    } else {
      downloadLink.onclick = null;
      downloadLink.href = '#';
    }
          }
        });

        window.addEventListener('popstate', (event) => {
        if (modal.style.display === "block") {
          modal.style.display = "none";
          document.body.classList.remove("no-scroll");
        }
        });

   

    closeBtn.onclick = () => {
      modal.style.display = "none";
      document.body.classList.remove("no-scroll");

      if(window.location.hash === "#modal") {
      window.history.back();
  }
    };

      if (!result.nextCursor) break;
    }

    console.log("Total file:", allFiles.length);
    
    // Render gambar...
  } catch (err) {
    console.error("Gagal load gallery:", err);
  }
}
loadGallery();

    if(window.location.hash === "#modal") {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

async function downloadFile(fileId, fileName) {
  const url = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/download?project=${projectId}`;

  try {
    // Fetch file sebagai Blob
    const response = await fetch(url, {
      headers: {
        // Jika butuh autentikasi token, tambahkan di sini
        // 'Authorization': 'Bearer <your-token>',
      }
    });

    if (!response.ok) throw new Error('Failed to fetch file');

    const blob = await response.blob();

    // Buat URL blob untuk download
    const blobUrl = URL.createObjectURL(blob);

    // Buat elemen <a> dan trigger download
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName || 'downloaded_file';
    document.body.appendChild(a);
    a.click();

    // Hapus elemen dan revoke URL
    a.remove();
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download error:', error);
    alert('Gagal mendownload file.');
  }
}


// Perbaiki script.js bagian scroll
// Ganti kode duplikasi card dengan ini:
const scrollContainer = document.getElementById('scroll');
const cards = Array.from(scrollContainer.children);

// Hapus semua child terlebih dahulu
while (scrollContainer.firstChild) {
  scrollContainer.removeChild(scrollContainer.firstChild);
}

// Duplikasi 5x untuk buffer lebih banyak
const duplicateTimes = 5;
Array.from({length: duplicateTimes}).forEach(() => {
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    scrollContainer.appendChild(clone);
  });
});

// Hitung ulang scroll width setelah render
setTimeout(() => {
  const totalWidth = scrollContainer.scrollWidth / duplicateTimes;
  scrollContainer.style.setProperty('--scroll-width', `${totalWidth}px`);
  scrollContainer.style.animationDuration = `${totalWidth / 50}px`; // 50px/detik
}, 500);

// Pause saat hover
  aboutusContainer.addEventListener('mouseenter', () => {
  aboutusContainer.classList.add('paused');
});
aboutusContainer.addEventListener('mouseleave', () => {
  aboutusContainer.classList.remove('paused');
});