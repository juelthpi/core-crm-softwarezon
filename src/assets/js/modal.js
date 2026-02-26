
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("[data-modal]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (!modal) return;

            modal.classList.remove("hidden");
            document.body.style.overflow = "hidden";


            requestAnimationFrame(() => {
                modal.querySelector(".modal-content").classList.add("show");
                modal.querySelector(".modal-backdrop").style.opacity = "1";
            });
        });
    });

    const closeModal = (modal) => {
        const content = modal.querySelector(".modal-content");
        const backdrop = modal.querySelector(".modal-backdrop");

        content.classList.remove("show");
        backdrop.style.opacity = "0";

        setTimeout(() => {
            modal.classList.add("hidden");
            document.body.style.overflow = "";
        }, 400);
    };

    document.querySelectorAll(".modal-close-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            closeModal(modal);
        });
    });

    document.querySelectorAll(".modal").forEach((modal) => {
        modal.addEventListener("click", (e) => {
            if (
                e.target === modal ||
                e.target.classList.contains("modal-backdrop")
            ) {
                closeModal(modal);
            }
        });
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document
                .querySelectorAll(".modal:not(.hidden)")
                .forEach((modal) => {
                    closeModal(modal);
                });
        }
    });
});
