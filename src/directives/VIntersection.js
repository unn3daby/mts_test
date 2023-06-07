export default {
    mounted(el, binding) {
        const options = {
            rootMargin: '1px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            
            if(entries[0].isIntersecting) {
                binding.value();
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);    
    },
    name: 'intersection'
}