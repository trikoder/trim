function range(start, stop) {
    return [...Array(stop + 1).keys()].slice(start);
}

module.exports = {
    baseApiUrl: process.env.BASE_API_URL,
    storageVersion: process.env.PACKAGE_VERSION,
    storageKey: 'trimDataset',
    resources: {
        article: {
            filters: {
                title: function(title, query) {

                    return title.toLowerCase().indexOf(query.toLowerCase()) >= 0;

                },
                publishDate: function(publishDateString, query) {

                    var publishDate = new Date(publishDateString);
                    var queryDate = new Date(query);

                    queryDate.setHours(0, 0, 0, 0);
                    publishDate.setHours(0, 0, 0, 0);

                    return publishDate.getTime() === queryDate.getTime();

                },
                special: function(special, query) {

                    return String(special) === query;

                },
                published: function(published, query) {

                    return String(published) === query;

                },
                author: function(author, query) {

                    return author.id === query;

                },
                tags: function(tags, query) {

                    return query.split(',').every(
                        tagId => Boolean(tags) && tags.filter(tag => tag.id === tagId).length > 0
                    );

                }
            },
            validationRules: {
                title: {
                    rule: function(title) {
                        return title.length > 0;
                    },
                    message: 'Please enter title.'
                }
            },
            data: function(random) {

                return range(1, 200).map(function(index) {
                    return {
                        type: 'article',
                        id: String(index),
                        attributes: {
                            title: 'Lorem ipsum dolor sit ament ' + index,
                            leadTitle: 'Ad veritatis necessitatibus',
                            published: random.boolean(),
                            special: random.boolean(),
                            publishDate: new Date().toISOString(),
                            intro: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi. Nam in luctus est. Phasellus nec neque sed ante posuere maximus. Sed nibh nisl, iaculis eget maximus nec, fringilla quis sem. Aenean dictum laoreet sapien.',
                            contentComponents: [{
                                clientId: '1',
                                content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at turpis sed erat tincidunt iaculis facilisis ac leo. Cras semper, dui in suscipit hendrerit, dui felis molestie elit, bibendum efficitur sapien elit sed magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis purus sagittis velit lacinia dignissim. Maecenas at pellentesque ante, in dignissim ex.</p><ul><li>Sed eget ipsum condimentum sem interdum gravida</li><li>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos</li><li>Praesent sagittis metus et metus mollis rhoncus</li></ul><p>Maecenas imperdiet mollis leo, vitae facilisis ex accumsan a. Vivamus semper viverra nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet magna nec nibh vehicula molestie. Morbi vestibulum tempor molestie. Nam ante turpis, convallis a ornare nec, pellentesque id nunc. Sed neque felis, auctor et ultrices ac, euismod vel mi. Vivamus in gravida velit, nec convallis dui.</p><p>Proin interdum sagittis sem in elementum. Duis non libero vitae lectus viverra semper. Nunc at eros accumsan, bibendum nisl a, tincidunt nulla. Aliquam vitae nunc scelerisque libero dignissim luctus. Vestibulum iaculis hendrerit ullamcorper. Nullam porttitor risus sed luctus pretium.</p>',
                                type: 'html'
                            }, {
                                clientId: '2',
                                imageId: '5146',
                                type: 'image',
                                alignment: 'central',
                                caption: 'Lorem ipsum dolor sit amet'
                            }, {
                                clientId: '3',
                                content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at turpis sed erat tincidunt iaculis facilisis ac leo. Cras semper, dui in suscipit hendrerit, dui felis molestie elit, bibendum efficitur sapien elit sed magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis purus sagittis velit lacinia dignissim. Maecenas at pellentesque ante, in dignissim ex.</p>',
                                type: 'html'
                            }],
                            metaTitle: 'Lorem ipsum dolor sit ament ' + index,
                            metaDiscription: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi. Nam in luctus est. Phasellus nec neque sed ante posuere maximus. Sed nibh nisl, iaculis eget maximus nec, fringilla quis sem. Aenean dictum laoreet sapien, vel consectetur est efficitur sit amet. Vivamus quis libero dolor. Nam purus turpis, aliquet quis arcu a, molestie placerat neque.',
                            latitude: '48.2206636',
                            longitude: '16.3100206',
                            proofreadStatus: '0',
                            graphicsStatus: '0'
                        },
                        relationships: {
                            author: {data: {id: random.id(1, 5), type: 'user'}},
                            media: {data: {id: random.id(1, 50), type: 'media'}},
                            tags: {
                                data: index % 10 === 0 ? null : [
                                    {id: random.id(1, 5), type: 'tag'},
                                    {id: random.id(6, 10), type: 'tag'},
                                    {id: random.id(1, 10), type: 'tag'}
                                ]
                            }
                        }
                    };
                });

            }
        },
        media: {
            filters: {
                title: function(title, query) {
                    return title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                },
                caption: function(caption, query) {
                    return caption.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                }
            },
            validationRules: {
                title: {
                    rule: function(title) {
                        return title.length > 0;
                    },
                    message: 'Please enter title.'
                }
            },
            data: function(random) {

                return range(1, 50).map(function(index) {
                    return {
                        type: 'media',
                        id: String(index),
                        attributes: {
                            title: 'Media item ' + index,
                            caption: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                            mediaType: 'image',
                            thumbnailUrl: 'http://picsum.photos/400/300?v=' + String(index),
                            originalUrl: 'http://picsum.photos/1200/900?v=' + String(index)
                        }
                    };
                });

            }
        },
        tag: {
            filters: {
                title: function(title, query) {
                    return title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                }
            },
            validationRules: {
                title: {
                    rule: function(title) {
                        return title.length > 0;
                    },
                    message: 'Please enter title.'
                }
            },
            data: function(random) {

                return range(1, 10).map(function(index) {
                    return {
                        type: 'tag',
                        id: String(index),
                        attributes: {
                            title: 'Tag ' + index
                        }
                    };
                });

            }
        },
        user: {
            filters: {
                email: function(email, query) {
                    return email.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                }
            },
            validationRules: {
                email: {
                    rule: function(email) {
                        return email.length > 0;
                    },
                    message: 'Please enter email.'
                }
            },
            data: function(random) {

                return range(1, 5).map(function(index) {
                    return {
                        type: 'user',
                        id: String(index),
                        attributes: {
                            email: 'test.user' + index + '@gmail.com'
                        },
                        relationships: {
                            contactData: {
                                data: index === 1 ? [
                                    {id: '1', type: 'userContactEntry'},
                                    {id: '2', type: 'userContactEntry'}
                                ] : null
                            }
                        }
                    };
                });

            }
        },
        userContactEntry: {
            validationRules: {
                label: {
                    rule: function(label) {
                        return label.length > 0;
                    },
                    message: 'Please enter label.'
                },
                entry: {
                    rule: function(entry) {
                        return entry.length > 0;
                    },
                    message: 'Please enter entry.'
                }
            },
            data: function(random) {

                return [{
                    type: 'userContactEntry',
                    id: '1',
                    attributes: {
                        label: 'Website',
                        entry: 'www.example.com',
                        position: 1
                    }
                }, {
                    type: 'userContactEntry',
                    id: '2',
                    attributes: {
                        label: 'Telephone',
                        entry: '099 1000 000',
                        position: 2
                    }
                }];

            }
        },
        page: {
            filters: {
                title: function(title, query) {
                    return title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                },
                published: function(published, query) {
                    return String(published) === query;
                },
                publishDate: function(publishDateString, query) {

                    var publishDate = new Date(publishDateString);
                    var queryDate = new Date(query);

                    queryDate.setHours(0, 0, 0, 0);
                    publishDate.setHours(0, 0, 0, 0);

                    return publishDate.getTime() === queryDate.getTime();

                },
                author: function(author, query) {
                    return author.id === query;
                },
                tags: function(tags, query) {

                    var tagIds = query.split(',');
                    return tagIds.every(tagId => tags.filter(tag => tag.id === tagId).length > 0);

                }
            },
            validationRules: {
                title: {
                    rule: function(title) {
                        return title.length > 0;
                    },
                    message: 'Please enter title.'
                }
            },
            data: function(random) {

                return range(1, 150).map(function(index) {
                    return {
                        type: 'page',
                        id: String(index),
                        attributes: {
                            title: 'Page ' + index,
                            published: random.boolean(),
                            publishDate: index % 10 === 0 ? null : new Date().toISOString(),
                            pageColor: '#e03431',
                            bodyText: '',
                            rank: random.int(1,10)
                        },
                        relationships: {
                            author: {data: {id: random.id(1, 5), type: 'user'}},
                            tags: {
                                data: [
                                    {id: random.id(1, 5), 'type': 'tag'},
                                    {id: random.id(6, 10), 'type': 'tag'}
                                ]
                            }
                        }
                    };
                });

            }
        },
        snippet: {
            filters: {
                title: function(title, query) {
                    return title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                }
            },
            validationRules: {
                title: {
                    rule: function(title) {
                        return title.length > 0;
                    },
                    message: 'Please enter title.'
                },
                code: {
                    rule: function(code) {
                        return code.length > 0;
                    },
                    message: 'Please enter code.'
                }
            },
            data: function(random) {

                return range(1, 50).map(function(index) {
                    return {
                        type: 'snippet',
                        id: String(index),
                        attributes: {
                            title: 'Snippet ' + index,
                            code: 'snippet.code.' + index,
                            content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>'
                        }
                    };
                });

            }
        },
        category: {
            filters: {
                title: function(title, query) {
                    return title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                },
                parentCategory: function(parentCategory, query) {
                    return parentCategory && parentCategory.id === query;
                }
            },
            validationRules: {
                title: {
                    rule: function(title) {
                        return title.length > 0;
                    },
                    message: 'Please enter title.'
                }
            },
            data: [{ // level 0
                type: 'category',
                id: '1',
                attributes: {
                    title: 'Category 1',
                    description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                    published: true,
                    imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=1',
                    imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=1'
                },
                relationships: {
                    parentCategory: {data: null},
                    childCategories: {data: null}
                }
            }, {
                type: 'category',
                id: '2',
                attributes: {
                    title: 'Category 2',
                    description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                    published: true,
                    imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=2',
                    imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=2'
                },
                relationships: {
                    parentCategory: {data: null},
                    childCategories: {data: [
                        {id: '4', type: 'category'},
                        {id: '5', type: 'category'}
                    ]}
                }
            }, {
                type: 'category',
                id: '3',
                attributes: {
                    title: 'Category 3',
                    description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                    published: true,
                    imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=3',
                    imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=3'
                },
                relationships: {
                    parentCategory: {data: null},
                    childCategories: {data: [
                        {id: '6', type: 'category'}
                    ]}
                }
            }, {
                type: 'category',
                id: '4',
                attributes: {
                    title: 'Category 4',
                    description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                    published: true,
                    imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=4',
                    imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=4'
                },
                relationships: {
                    parentCategory: {data: {id: '2', type: 'category'}},
                    childCategories: {data: null}
                }
            }, {
                type: 'category',
                id: '5',
                attributes: {
                    title: 'Category 5',
                    description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                    published: true,
                    imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=5',
                    imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=5'
                },
                relationships: {
                    parentCategory: {data: {id: '2', type: 'category'}},
                    childCategories: {data: [
                        {id: '7', type: 'category'}
                    ]}
                }
            }, {
                type: 'category',
                id: '6',
                attributes: {
                    title: 'Category 6',
                    description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                    published: true,
                    imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=6',
                    imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=6'
                },
                relationships: {
                    parentCategory: {data: {id: '3', type: 'category'}},
                    childCategories: {data: null}
                }
            }, {
                type: 'category',
                id: '7',
                attributes: {
                    title: 'Category 7',
                    description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                    published: true,
                    imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=7',
                    imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=7'
                },
                relationships: {
                    parentCategory: {data: {id: '5', type: 'category'}},
                    childCategories: {data: null}
                }
            }]
        }
    }
};
