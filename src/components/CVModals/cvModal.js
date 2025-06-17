// Variable global para almacenar el archivo seleccionado
let selectedFile = null;

// Configuración de la aplicación
const CONFIG = {
  API_ENDPOINT: "/api/send_email",
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ],
  TIMEOUT: 30000, // 30 segundos
};

// Función para abrir el modal
function openModal() {
  const modal = document.getElementById("modalOverlay");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById("modalOverlay");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    resetForm();
  }
}

// Resetear formulario
function resetForm() {
  const form = document.getElementById("cvForm");
  const filePreview = document.getElementById("filePreview");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");
  const fileInput = document.getElementById("fileInput");

  if (form) form.reset();
  if (filePreview) filePreview.style.display = "none";
  if (successMessage) successMessage.style.display = "none";
  if (errorMessage) errorMessage.style.display = "none";
  if (fileInput) fileInput.value = "";

  selectedFile = null;
}

// Manejar selección de archivos
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validar tipo de archivo
  if (!CONFIG.ALLOWED_TYPES.includes(file.type)) {
    showError("Por favor selecciona un archivo PDF, DOC, DOCX o TXT");
    event.target.value = "";
    return;
  }

  // Validar tamaño de archivo
  if (file.size > CONFIG.MAX_FILE_SIZE) {
    showError(
      `El archivo es demasiado grande. El tamaño máximo permitido es ${formatFileSize(
        CONFIG.MAX_FILE_SIZE
      )}. ` + `Tu archivo tiene ${formatFileSize(file.size)}.`
    );
    event.target.value = "";
    return;
  }

  selectedFile = file;
  showFilePreview(file);
  hideMessages();
}

// Mostrar preview del archivo
function showFilePreview(file) {
  const fileName = document.getElementById("fileName");
  const fileSize = document.getElementById("fileSize");
  const filePreview = document.getElementById("filePreview");

  if (fileName) fileName.textContent = file.name;
  if (fileSize) fileSize.textContent = formatFileSize(file.size);
  if (filePreview) filePreview.style.display = "block";
}

// Remover archivo seleccionado
function removeFile() {
  const fileInput = document.getElementById("fileInput");
  const filePreview = document.getElementById("filePreview");

  selectedFile = null;
  if (fileInput) fileInput.value = "";
  if (filePreview) filePreview.style.display = "none";
  hideMessages();
}

// Formatear tamaño de archivo
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Mostrar mensaje de éxito
function showSuccess(message) {
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");

  if (successMessage) {
    successMessage.textContent = message;
    successMessage.style.display = "block";
  }
  if (errorMessage) {
    errorMessage.style.display = "none";
  }
}

// Mostrar mensaje de error
function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");

  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
  }
  if (successMessage) {
    successMessage.style.display = "none";
  }
}

// Ocultar mensajes
function hideMessages() {
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");

  if (successMessage) successMessage.style.display = "none";
  if (errorMessage) errorMessage.style.display = "none";
}

// Validar formulario
function validateForm() {
  const fullName = document.getElementById("fullName")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();

  if (!fullName || fullName.length < 2) {
    showError(
      "El nombre completo es requerido y debe tener al menos 2 caracteres"
    );
    return false;
  }

  if (!email) {
    showError("El correo electrónico es requerido");
    return false;
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError("Por favor ingresa un correo electrónico válido");
    return false;
  }

  // Validar teléfono si se proporciona
  if (phone && phone.length > 0) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      showError("El teléfono contiene caracteres no válidos");
      return false;
    }
  }

  if (!selectedFile) {
    showError("Por favor selecciona un archivo CV");
    return false;
  }

  return true;
}

// Crear request con timeout
function createTimeoutPromise(promise, timeout) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("timeout"));
    }, timeout);

    promise
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

// Enviar formulario al backend
async function submitForm() {
  if (!validateForm()) {
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  const originalText = submitBtn?.textContent || "Enviar Aplicación";

  try {
    // Deshabilitar botón y mostrar loading
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
    }

    hideMessages();

    // Crear FormData con todos los campos
    const formData = new FormData();
    formData.append(
      "nombreCompleto",
      document.getElementById("fullName")?.value.trim() || ""
    );
    formData.append(
      "correoElectronico",
      document.getElementById("email")?.value.trim() || ""
    );
    formData.append(
      "telefono",
      document.getElementById("phone")?.value.trim() || ""
    );
    formData.append(
      "posicionInteres",
      document.getElementById("position")?.value.trim() || ""
    );
    formData.append(
      "mensaje",
      document.getElementById("message")?.value.trim() || ""
    );
    formData.append("cv", selectedFile);

    // Debug: Log form data (solo en desarrollo)
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.log("Enviando FormData con los siguientes campos:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(
            key,
            ":",
            `File(${value.name}, ${value.size} bytes, ${value.type})`
          );
        } else {
          console.log(key, ":", value);
        }
      }
    }

    // Crear la request con timeout
    const fetchPromise = fetch(CONFIG.API_ENDPOINT, {
      method: "POST",
      body: formData,
      // No establecer Content-Type manualmente - el navegador lo hará automáticamente para FormData
    });

    // Aplicar timeout
    const response = await createTimeoutPromise(fetchPromise, CONFIG.TIMEOUT);

    // Verificar si la respuesta es válida
    if (!response.ok) {
      throw new Error(
        `Error del servidor: ${response.status} ${response.statusText}`
      );
    }

    // Verificar que la respuesta sea JSON válido
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("La respuesta del servidor no es JSON válido");
    }

    const result = await response.json();

    if (result.success) {
      showSuccess("¡Aplicación enviada exitosamente! Te contactaremos pronto.");

      // Cerrar modal después de un breve retraso
      setTimeout(() => {
        closeModal();
      }, 3000);
    } else {
      // Manejar errores de validación del backend
      if (result.details && Array.isArray(result.details)) {
        showError(`Errores de validación: ${result.details.join(", ")}`);
      } else {
        throw new Error(
          result.error || "Error desconocido al enviar la aplicación"
        );
      }
    }
  } catch (error) {
    console.error("Error al enviar aplicación:", error);

    let errorMessage =
      "Hubo un error al enviar tu aplicación. Por favor, intenta de nuevo.";

    // Manejar errores específicos
    if (error.message === "timeout") {
      errorMessage =
        "La solicitud ha tardado demasiado. Por favor, intenta nuevamente.";
    } else if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("NetworkError")
    ) {
      errorMessage =
        "Error de conexión. Verifica tu conexión a internet e intenta nuevamente.";
    } else if (error.message.includes("404")) {
      errorMessage =
        "El servicio no está disponible. Por favor, contacta al administrador.";
    } else if (error.message.includes("500")) {
      errorMessage =
        "Error interno del servidor. Por favor, intenta más tarde.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    showError(errorMessage);
  } finally {
    // Restaurar botón
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}

// Función de utilidad para hacer ping al servidor
async function checkServerHealth() {
  try {
    const response = await fetch(CONFIG.API_ENDPOINT, {
      method: "GET",
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Server health check:", result);
      return true;
    }
    return false;
  } catch (error) {
    console.warn("Server health check failed:", error);
    return false;
  }
}

// Exponer funciones globalmente
window.openModal = openModal;
window.closeModal = closeModal;
window.handleFileSelect = handleFileSelect;
window.removeFile = removeFile;
window.checkServerHealth = checkServerHealth;

// Inicializar funcionalidad cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  // Verificar salud del servidor al cargar la página (opcional)
  checkServerHealth().then((isHealthy) => {
    if (!isHealthy) {
      console.warn("El servidor no responde correctamente");
    }
  });

  const workButton = document.getElementById("workButton");
  if (workButton) {
    workButton.addEventListener("click", openModal);
  }

  // Configurar drag and drop
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");

  if (uploadArea && fileInput) {
    // Prevenir comportamiento por defecto para drag and drop
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight upload area cuando se arrastra archivo
    ["dragenter", "dragover"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, unhighlight, false);
    });

    // Manejar files dropped
    uploadArea.addEventListener("drop", handleDrop, false);

    // Click para abrir file selector
    uploadArea.addEventListener("click", (e) => {
      if (e.target !== fileInput && !e.target.closest(".file-preview")) {
        fileInput.click();
      }
    });
  }

  // Configurar envío del formulario
  const cvForm = document.getElementById("cvForm");
  if (cvForm) {
    cvForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm();
    });
  }

  // Cerrar modal al hacer clic fuera
  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }

  // Cerrar modal con tecla Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const modal = document.getElementById("modalOverlay");
      if (modal && modal.classList.contains("active")) {
        closeModal();
      }
    }
  });
});

// Funciones auxiliares para drag and drop
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  const uploadArea = document.getElementById("uploadArea");
  if (uploadArea) {
    uploadArea.classList.add("dragover");
  }
}

function unhighlight(e) {
  const uploadArea = document.getElementById("uploadArea");
  if (uploadArea) {
    uploadArea.classList.remove("dragover");
  }
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  const fileInput = document.getElementById("fileInput");

  if (files.length > 0) {
    // Crear un nuevo DataTransfer para simular la selección de archivo
    const newDt = new DataTransfer();
    newDt.items.add(files[0]);

    if (fileInput) {
      fileInput.files = newDt.files;
    }

    handleFileSelect({ target: { files } });
  }
}
