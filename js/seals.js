Seals = function() {

}

Seals.UI = {
    Container: container = {},
    Templates: {
        about_template: $("#about_template").html(),
        teaching_template: $("#teaching_template").html(),
        students_template: $("#students_template").html(),
        involvement_template: $("#involvement_template").html(),
        projects_template: $("#projects_template").html(),
        publications_template: $("#publications_template").html(),
    },
    NavMenu: {
        $el: undefined,
        elements: {
            tabs: undefined,
            about: undefined,
            teaching: undefined,
            students: undefined,
            involvement: undefined,
            projects: undefined,
            publications: undefined,
        },
        getStaticElements: function() {
            this.$el = $("#nav_menu");

            this.elements.tabs = this.$el.find(".nav_link");
            this.elements.about = this.$el.find("#about");
            this.elements.teaching = this.$el.find("#teaching");
            this.elements.students = this.$el.find("#students");
            this.elements.involvement = this.$el.find("#involvement");
            this.elements.projects = this.$el.find("#projects");
            this.elements.publications = this.$el.find("#publications");
        },
        setEventsListeners: function() {
            this.elements.tabs.mousedown(this.eventFunctions.loadFeature);
            this.elements.tabs.click(function(e) { e.preventDefault(); });
        },
        eventFunctions: {
            tabs: {
                about: function() {
                    Seals.UI.NavMenu.elements.tabs.removeClass("activeTab");
                    Seals.UI.NavMenu.elements.about.addClass('activeTab');
                    Seals.UI.Widgets.options.about.create($("#main"));
                },
                teaching: function() {
                    Seals.UI.NavMenu.elements.tabs.removeClass("activeTab");
                    Seals.UI.NavMenu.elements.teaching.addClass('activeTab');
                    Seals.UI.Widgets.options.teaching.create($("#main"));
                },
                students: function() {
                    Seals.UI.NavMenu.elements.tabs.removeClass("activeTab");
                    Seals.UI.NavMenu.elements.students.addClass('activeTab');
                    Seals.UI.Widgets.options.students.create($("#main"));
                },
                involvement: function() {
                    Seals.UI.NavMenu.elements.tabs.removeClass("activeTab");
                    Seals.UI.NavMenu.elements.involvement.addClass('activeTab');
                    Seals.UI.Widgets.options.involvement.create($("#main"));
                },
                projects: function() {
                    Seals.UI.NavMenu.elements.tabs.removeClass("activeTab");
                    Seals.UI.NavMenu.elements.projects.addClass('activeTab');
                    Seals.UI.Widgets.options.projects.create($("#main"));
                },
                publications: function() {
                    Seals.UI.NavMenu.elements.tabs.removeClass("activeTab");
                    Seals.UI.NavMenu.elements.publications.addClass('activeTab');
                    Seals.UI.Widgets.options.publications.create($("#main"));
                },
            },
            setHref: function(e) {
                var id = e.currentTarget.dataset.id;
                var el = Seals.UI.NavMenu.elements[id];
                var path = location.pathname.split('/');
                //var feature = Seals.MainView.tabs[id].defaultFeature;

                el[0].href = "/" + id;
            },
            loadFeature: function(e) {
                var state = {
                    tab: "",
                };

                e.preventDefault();

                Seals.UI.NavMenu.eventFunctions.setHref(e);
                if (e.which != 1) return;

                Seals.UI.NavMenu.elements.tabs.removeClass("activeTab");

                var id = e.currentTarget.dataset.id;
                var feature = e.currentTarget.dataset.feature;
                var el = Seals.UI.NavMenu.elements[id];

                //window.history.replaceState(null,null, window.location.pathname + "/" + id);
                //window.history.pushState(state, "", + "/" + id );
                //Util.cookies.set("lastFeature", (s.isClientPortal() ? "/profile/" + Master.History.state.profile : "") + "/app/" + project + "/" + tab + "/" + feature + "/" + item, 7, "/");


                Seals.UI.NavMenu.eventFunctions.tabs[id]();

            },
        }
    },
    Widgets: {
        elements: {
            about: undefined,
            teaching: undefined,
            students: undefined,
            involvement: undefined,
            projects: undefined,
            publications: undefined,
        },
        options: {
            about: {
                id: "about",
                title: "About | Cheryl D Seals Website",
                appendTo: $('#main'),
                create: function(container) {
                    document.title = this.title;
                    container.html(Seals.UI.Templates.about_template);
                    this.bindEvents(container);
                },
                bindEvents: function(container) {}
            },
            teaching: {
                id: "teaching",
                title: "Teaching | Cheryl D Seals Website",
                appendTo: $('#main'),
                create: function(container) {
                    document.title = this.title;
                    container.html(Seals.UI.Templates.teaching_template);
                    this.bindEvents(container);
                },
                bindEvents: function(container) {}
            },
            students: {
                id: "students",
                title: "Students | Cheryl D Seals Website",
                appendTo: $('#main'),
                create: function(container) {
                    document.title = this.title;
                    container.html(Seals.UI.Templates.students_template);
                    this.bindEvents(container);
                },
                bindEvents: function(container) {}
            },
            involvement: {
                id: "involvement",
                title: "Involvement | Cheryl D Seals Website",
                appendTo: $('#main'),
                create: function(container) {
                    document.title = this.title;
                    container.html(Seals.UI.Templates.involvement_template);
                    this.bindEvents(container);
                },
                bindEvents: function(container) {}
            },
            projects: {
                id: "projects",
                title: "Projects | Cheryl D Seals Website",
                appendTo: $('#main'),
                create: function(container) {
                    document.title = this.title;
                    container.html(Seals.UI.Templates.projects_template);
                    this.bindEvents(container);
                },
                bindEvents: function(container) {}
            },
            publications: {
                id: "publications",
                title: "Publications | Cheryl D Seals Website",
                appendTo: $('#main'),
                create: function(container) {
                    document.title = this.title;
                    container.html(Seals.UI.Templates.publications_template);
                    this.bindEvents(container);
                },
                bindEvents: function(container) {

                    // search publication
                    $('#searchbar button#searchButton').on('click', function() {
                        var input = document.getElementById("searchInput").value;
                        var filter = input.toLowerCase();
                        var publication = $("#publicationsList");
                        var publication_container = $("#publicationsList .pubItems");
                        var publication_list = $("#publicationsList .pubItems .item");

                        for (let i = 0; i < publication_list.length; i++) {
                            let pubtitle = $(publication_list[i]).find(".pubDetail")[0];
                            if (pubtitle) {
                                let txtValue = pubtitle.textContent || pubtitle.innerText;
                                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                                    publication_list[i].style.display = "inline-block";
                                } else {
                                    publication_list[i].style.display = "none";
                                }
                            }
                        }
                    });

                    // enter and backspace event
                    $('#searchbar input#searchInput').keyup(function(e) {
                        if (e.which == 13) {
                            $('#searchbar button#searchButton').click();
                        } else if ((e.which == 8 || e.which == 46) && !document.getElementById("searchInput").value) {
                            let publication_list = $("#publicationsList .pubItems .item");
                            for (let i = 0; i < publication_list.length; i++) {
                                publication_list[i].style.display = "inline-block";
                            }
                        }
                    });
                }
            }
        },
        setupWidgets: function() {
            this.elements.about = this.options.about;

            this.elements.about.create($("#main"));
        }

    },

    load: function() {
        this.Widgets.setupWidgets();
        this.NavMenu.getStaticElements();
        this.NavMenu.setEventsListeners();
    },
}


$(document).ready(function(e) {
    Seals.UI.load();
});