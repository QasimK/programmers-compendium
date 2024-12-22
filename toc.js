// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> The Programmer&#39;s Compendium</a></li><li class="chapter-item expanded affix "><li class="part-title">Recipes</li><li class="chapter-item expanded "><a href="recipes/nginx.html"><strong aria-hidden="true">2.</strong> Nginx</a></li><li class="chapter-item expanded "><a href="recipes/uwsgi.html"><strong aria-hidden="true">3.</strong> uWSGI</a></li><li class="chapter-item expanded "><a href="recipes/kubernetes.html"><strong aria-hidden="true">4.</strong> Kubernetes</a></li><li class="chapter-item expanded "><a href="recipes/gcloud.html"><strong aria-hidden="true">5.</strong> GCloud</a></li><li class="chapter-item expanded "><a href="recipes/postgres.html"><strong aria-hidden="true">6.</strong> Postgres</a></li><li class="chapter-item expanded affix "><li class="part-title">Python</li><li class="chapter-item expanded "><a href="python/overview.html"><strong aria-hidden="true">7.</strong> Python Overview</a></li><li class="chapter-item expanded "><a href="python/profiling.html"><strong aria-hidden="true">8.</strong> Profiling</a></li><li class="chapter-item expanded "><a href="python/versions.html"><strong aria-hidden="true">9.</strong> Versions</a></li><li class="chapter-item expanded "><a href="python/sqlalchemy.html"><strong aria-hidden="true">10.</strong> SQLAlchemy</a></li><li class="chapter-item expanded affix "><li class="part-title">Topics</li><li class="chapter-item expanded "><a href="topics/web.html"><strong aria-hidden="true">11.</strong> Web</a></li><li class="chapter-item expanded "><a href="topics/git.html"><strong aria-hidden="true">12.</strong> Git</a></li><li class="chapter-item expanded "><a href="topics/networking.html"><strong aria-hidden="true">13.</strong> Networking</a></li><li class="chapter-item expanded "><a href="topics/crypto.html"><strong aria-hidden="true">14.</strong> Crypto</a></li><li class="chapter-item expanded "><a href="topics/time.html"><strong aria-hidden="true">15.</strong> Time</a></li><li class="chapter-item expanded "><a href="topics/bash.html"><strong aria-hidden="true">16.</strong> Bash Scripts</a></li><li class="chapter-item expanded "><a href="topics/xml.html"><strong aria-hidden="true">17.</strong> XML</a></li><li class="chapter-item expanded affix "><li class="part-title">SQL/DB</li><li class="chapter-item expanded "><a href="sql/databases.html"><strong aria-hidden="true">18.</strong> Databases</a></li><li class="chapter-item expanded "><a href="sql/querying.html"><strong aria-hidden="true">19.</strong> Querying</a></li><li class="chapter-item expanded "><a href="sql/joins.html"><strong aria-hidden="true">20.</strong> Joins</a></li><li class="chapter-item expanded "><a href="sql/trust.html"><strong aria-hidden="true">21.</strong> Trust</a></li><li class="chapter-item expanded "><a href="sql/migrations.html"><strong aria-hidden="true">22.</strong> Migrations</a></li><li class="chapter-item expanded "><a href="sql/migrations-howto.html"><strong aria-hidden="true">23.</strong> Migrations-HOWTO</a></li><li class="chapter-item expanded "><a href="sql/postgres.html"><strong aria-hidden="true">24.</strong> Postgres</a></li><li class="chapter-item expanded affix "><li class="part-title">Linux</li><li class="chapter-item expanded "><a href="linux/overview.html"><strong aria-hidden="true">25.</strong> Overview</a></li><li class="chapter-item expanded "><a href="linux/systemd.html"><strong aria-hidden="true">26.</strong> Systemd</a></li><li class="chapter-item expanded "><a href="linux/shells.html"><strong aria-hidden="true">27.</strong> Shells</a></li><li class="chapter-item expanded "><a href="linux/ssh.html"><strong aria-hidden="true">28.</strong> SSH/Mosh</a></li><li class="chapter-item expanded "><a href="linux/containerisation.html"><strong aria-hidden="true">29.</strong> Containers</a></li><li class="chapter-item expanded "><a href="linux/terminal.html"><strong aria-hidden="true">30.</strong> Terminal Pro</a></li><li class="chapter-item expanded affix "><li class="part-title">Domains</li><li class="chapter-item expanded "><a href="domains/accounting.html"><strong aria-hidden="true">31.</strong> Accounting</a></li><li class="chapter-item expanded "><a href="domains/audio.html"><strong aria-hidden="true">32.</strong> Audio</a></li><li class="chapter-item expanded "><a href="domains/encoding.html"><strong aria-hidden="true">33.</strong> Encoding</a></li><li class="chapter-item expanded affix "><li class="part-title">Software Development</li><li class="chapter-item expanded "><a href="software-development/principles.html"><strong aria-hidden="true">34.</strong> Principles</a></li><li class="chapter-item expanded "><a href="software-development/design-patterns.html"><strong aria-hidden="true">35.</strong> Design Patterns</a></li><li class="chapter-item expanded "><a href="software-development/anti-patterns.html"><strong aria-hidden="true">36.</strong> Anti-patterns</a></li><li class="chapter-item expanded "><a href="software-development/testing.html"><strong aria-hidden="true">37.</strong> Testing</a></li><li class="chapter-item expanded "><a href="software-development/architecture-patterns.html"><strong aria-hidden="true">38.</strong> Architecture Patterns</a></li><li class="chapter-item expanded "><a href="software-development/apis.html"><strong aria-hidden="true">39.</strong> APIs</a></li><li class="chapter-item expanded "><a href="software-development/agile.html"><strong aria-hidden="true">40.</strong> Agile</a></li><li class="chapter-item expanded "><a href="software-development/refactoring.html"><strong aria-hidden="true">41.</strong> Refactoring</a></li><li class="chapter-item expanded "><a href="software-development/documentation.html"><strong aria-hidden="true">42.</strong> Documentation</a></li><li class="chapter-item expanded "><a href="software-development/estimating.html"><strong aria-hidden="true">43.</strong> Estimating</a></li><li class="chapter-item expanded "><a href="software-development/ddd.html"><strong aria-hidden="true">44.</strong> DDD</a></li><li class="chapter-item expanded affix "><li class="part-title">Fundamentals</li><li class="chapter-item expanded "><a href="core/sorting.html"><strong aria-hidden="true">45.</strong> Sorting</a></li><li class="chapter-item expanded "><a href="core/strings.html"><strong aria-hidden="true">46.</strong> Strings</a></li><li class="chapter-item expanded affix "><li class="part-title">Thoughts</li><li class="chapter-item expanded "><a href="thoughts/avoid-makefiles.html"><strong aria-hidden="true">47.</strong> Avoid Makefiles</a></li><li class="chapter-item expanded "><a href="thoughts/django-orm.html"><strong aria-hidden="true">48.</strong> Django ORM</a></li><li class="chapter-item expanded "><a href="thoughts/safe-writes.html"><strong aria-hidden="true">49.</strong> Safe Writes</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><li class="part-title">Appendix</li><li class="chapter-item expanded "><a href="appendix/reading-materials.html"><strong aria-hidden="true">50.</strong> Reading Materials</a></li><li class="chapter-item expanded "><a href="appendix/references.html"><strong aria-hidden="true">51.</strong> References</a></li><li class="chapter-item expanded "><a href="appendix/talk-notes.html"><strong aria-hidden="true">52.</strong> Talk Notes</a></li><li class="chapter-item expanded "><a href="appendix/know-thy-history.html"><strong aria-hidden="true">53.</strong> Know Thy History</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="ignore-me/maybes.html">Maybes-Todos-Snippets</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
