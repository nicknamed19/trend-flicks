const callback = (entries) => {
    entries
        .filter(entrie => entrie.isIntersecting)
        .forEach(entrie => {
            const div = entrie.target;
            const img = div.firstChild;
            const url = img.dataset.src;
            img.src = url

            observer.unobserve(div)
        })
}

const observer = new IntersectionObserver(callback);

const registerImage = (img) => {
    observer.observe(img)
}