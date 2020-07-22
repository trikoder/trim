const contains = require('mout/string/contains');
const get = require('mout/object/get');
const range = require('mout/array/range');
const randBool = require('mout/random/randBool');
const randInt = require('mout/random/randInt');
const randId = (start, end) => randInt(start, end).toString();
const attributeIncludes = (resource, attribute, text) => {
    return contains(
        resource.attributes[attribute].toLowerCase(),
        text.toLowerCase()
    );
}

module.exports = {
    article: {
        fieldsSchema: ({action}) => ({
            attributes: {
                title: {type: String, required: action === 'create', minLength: 2},
                leadTitle: {type: String, default: ''},
                published: {type: Boolean, default: false},
                special: {type: Boolean, default: false},
                publishDate: {type: String, default: new Date().toISOString()},
                intro: {type: String, default: ''},
                contentComponents: {type: Array, default: []},
                metaTitle: {type: String, default: ''},
                metaDescription: {type: String, default: ''},
                latitude: {type: String, default: ''},
                longitude: {type: String, default: ''},
                proofreadStatus: {type: String, default: '0'},
                graphicsStatus: {type: String, default: '0'},
                location: {type: String, default: ''}
            },
            relationships: {
                author: {hasOne: 'user', nullable: true, default: null},
                media: {hasOne: 'media', nullable: true, default: null},
                tags: {hasMany: 'tag', default: []}
            }
        }),
        filters: {
            title(resource, filterValue) {
                return attributeIncludes(resource, 'title', filterValue);
            },
            publishDate(resource, filterValue) {
                const articleDate = resource.attributes.publishDate;
                const publishDate = new Date(articleDate);
                const filterDate = new Date(filterValue);

                filterDate.setHours(0, 0, 0, 0);
                publishDate.setHours(0, 0, 0, 0);

                return publishDate.getTime() === filterDate.getTime();
            },
            special(resource, filterValue) {
                return String(resource.attributes.special) === filterValue;
            },
            published(resource, filterValue) {
                return String(resource.attributes.published) === filterValue;
            },
            author(resource, filterValue) {
                return get(resource, 'relationships.author.data.id') === filterValue;
            },
            tags(resource, filterValue) {
                const tags = get(resource, 'relationships.tags.data') || [];

                return filterValue.split(',').every(
                    tagId => Boolean(tags) && tags.filter(tag => tag.id === tagId).length > 0
                );
            }
        },
        sorts: {
            'id': {
                field: 'id',
                order: 'ascending'
            },
            '-id': {
                field: 'id',
                order: 'descending'
            }
        },
        dataset() {
            return range(1, 200).map(function(index) {
                return {
                    type: 'article',
                    id: String(index),
                    attributes: {
                        title: 'Lorem ipsum dolor sit ament ' + index,
                        leadTitle: 'Ad veritatis necessitatibus',
                        published: randBool(),
                        special: randBool(),
                        publishDate: new Date().toISOString(),
                        intro: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi. Nam in luctus est. Phasellus nec neque sed ante posuere maximus. Sed nibh nisl, iaculis eget maximus nec, fringilla quis sem. Aenean dictum laoreet sapien.',
                        contentComponents: [],
                        metaTitle: 'Lorem ipsum dolor sit ament ' + index,
                        metaDescription: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi. Nam in luctus est. Phasellus nec neque sed ante posuere maximus. Sed nibh nisl, iaculis eget maximus nec, fringilla quis sem. Aenean dictum laoreet sapien, vel consectetur est efficitur sit amet. Vivamus quis libero dolor. Nam purus turpis, aliquet quis arcu a, molestie placerat neque.',
                        latitude: '48.2206636',
                        longitude: '16.3100206',
                        proofreadStatus: '0',
                        graphicsStatus: '0',
                        location: ''
                    },
                    relationships: {
                        author: {data: {id: randId(1, 5), type: 'user'}},
                        media: {data: {id: randId(1, 50), type: 'media'}},
                        tags: {
                            data: index % 10 === 0 ? [] : [
                                {id: randId(1, 5), type: 'tag'},
                                {id: randId(6, 10), type: 'tag'},
                                {id: randId(1, 10), type: 'tag'}
                            ]
                        }
                    }
                };
            });
        }
    },
    media: {
        fieldsSchema: ({action}) => ({
            attributes: {
                title: {type: String, required: action === 'create', minLength: 1},
                caption: {type: String, default: ''},
                mediaType: {type: String, required: action === 'create', oneOf: ['image', 'file'], readOnly: action === 'edit'},
                thumbnailUrl: {type: String, default: ''},
                originalUrl: {type: String, default: ''},
                url: {type: String, default: ''}
            }
        }),
        filters: {
            title(resource, filterValue) {
                return attributeIncludes(resource, 'title', filterValue);
            },
            caption(resource, filterValue) {
                return attributeIncludes(resource, 'caption', filterValue);
            },
            mediaType(resource, filterValue) {
                return attributeIncludes(resource, 'mediaType', filterValue);
            }
        },
        dataset() {
            return range(1, 50).map(function(index) {
                return {
                    type: 'media',
                    id: String(index),
                    attributes: {
                        title: 'Media item ' + index,
                        caption: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                        mediaType: index < 40 ? 'image' : 'file',
                        thumbnailUrl: 'http://picsum.photos/400/300?v=' + String(index),
                        originalUrl: 'http://picsum.photos/1200/900?v=' + String(index),
                        url: 'http://picsum.photos/1200/900?v=' + String(index)
                    }
                };
            });
        }
    },
    tag: {
        fieldsSchema: ({action}) => ({
            attributes: {
                title: {type: String, required: true, minLength: 1}
            }
        }),
        filters: {
            title(resource, filterValue) {
                return attributeIncludes(resource, 'title', filterValue);
            }
        },
        dataset() {
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
        fieldsSchema: ({action}) => ({
            attributes: {
                email: {type: String, email: true, required: true}
            },
            relationships: {
                contactData: {hasMany: 'userContactEntry', default: []}
            }
        }),
        filters: {
            email(resource, filterValue) {
                return attributeIncludes(resource, 'email', filterValue);
            }
        },
        dataset() {
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
                            ] : []
                        }
                    }
                };
            });
        }
    },
    userContactEntry: {
        fieldsSchema: ({action}) => ({
            attributes: {
                label: {type: String, required: action === 'create', minLength: 1},
                entry: {type: String, required: action === 'create', minLength: 1},
                position: {type: Number, integer: true, required: action === 'create'}
            }
        }),
        dataset() {
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
        fieldsSchema: ({action}) => ({
            attributes: {
                title: {type: String, required: action === 'create', minLength: 1},
                published: {type: Boolean, default: false},
                publishDate: {type: String, default: ''},
                pageColor: {type: String, default: ''},
                bodyText: {type: String, default: ''},
                rank: {type: Number, integer: true, default: 1}
            },
            relationships: {
                author: {hasOne: 'user', nullable: true, default: null},
                tags: {hasMany: 'tag', default: []}
            }
        }),
        filters: {
            title(resource, filterValue) {
                return attributeIncludes(resource, 'title', filterValue);
            },
            published(resource, filterValue) {
                return String(resource.attributes.published) === filterValue;
            },
            publishDate(resource, filterValue) {
                const publishDateString = resource.attributes.publishDate;
                const publishDate = new Date(publishDateString);
                const filterValueDate = new Date(filterValue);

                filterValueDate.setHours(0, 0, 0, 0);
                publishDate.setHours(0, 0, 0, 0);

                return publishDate.getTime() === filterValueDate.getTime();
            },
            author(resource, filterValue) {
                return get(resource, 'relationships.author.id') === filterValue;
            },
            tags(resource, filterValue) {
                const tags = get(resource, 'relationships.tags.data') || [];

                return filterValue.split(',').every(
                    tagId => Boolean(tags) && tags.filter(tag => tag.id === tagId).length > 0
                );
            }
        },
        dataset() {
            return range(1, 150).map(function(index) {
                return {
                    type: 'page',
                    id: String(index),
                    attributes: {
                        title: 'Page ' + index,
                        published: randBool(),
                        publishDate: index % 10 === 0 ? null : new Date().toISOString(),
                        pageColor: '#e03431',
                        bodyText: '',
                        rank: randInt(1, 10)
                    },
                    relationships: {
                        author: {data: {id: randId(1, 5), type: 'user'}},
                        tags: {
                            data: [
                                {id: randId(1, 5), 'type': 'tag'},
                                {id: randId(6, 10), 'type': 'tag'}
                            ]
                        }
                    }
                };
            });
        }
    },
    snippet: {
        fieldsSchema: ({action}) => ({
            attributes: {
                title: {type: String, required: action === 'create', minLength: 1},
                code: {type: String, required: action === 'create', minLength: 1},
                content: {type: String, default: ''},
            }
        }),
        filters: {
            title(resource, filterValue) {
                return attributeIncludes(resource, 'title', filterValue);
            }
        },
        dataset() {
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
        fieldsSchema: ({action}) => ({
            attributes: {
                title: {type: String, required: action === 'create', minLength: 1},
                description: {type: String, default: ''},
                published: {type: Boolean, default: false},
                position: {type: Number, integer: true, required: action === 'create'},
                imageThumbnailUrl: {type: String, readOnly: true},
                imageOriginalUrl: {type: String, readOnly: true}
            },
            relationships: {
                parentCategory: {hasOne: 'category', nullable: true, default: null},
                childCategories: {hasMany: 'category', readOnly: true}
            }
        }),
        filters: {
            title(resource, filterValue) {
                return attributeIncludes(resource, 'title', filterValue);
            },
            parentCategory(parentCategory, filterValue) {
                return get(resource, 'relationships.parentCategory.id') === filterValue;
            }
        },
        validate({data, validator}) {
            if (get(data, 'attributes.title') === '') {
                validator.addAttributeError('title', 'Please enter title');
            }
            return validator.report();
        },
        dataset: [{ // level 0
            type: 'category',
            id: '1',
            attributes: {
                title: 'Category 1',
                description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                published: true,
                position: 1,
                imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=1',
                imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=1'
            },
            relationships: {
                parentCategory: {data: null},
                childCategories: {data: []}
            }
        }, {
            type: 'category',
            id: '2',
            attributes: {
                title: 'Category 2',
                description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                published: true,
                position: 2,
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
                position: 3,
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
                position: 1,
                imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=4',
                imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=4'
            },
            relationships: {
                parentCategory: {data: {id: '2', type: 'category'}},
                childCategories: {data: []}
            }
        }, {
            type: 'category',
            id: '5',
            attributes: {
                title: 'Category 5',
                description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                published: true,
                position: 2,
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
                position: 1,
                imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=6',
                imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=6'
            },
            relationships: {
                parentCategory: {data: {id: '3', type: 'category'}},
                childCategories: {data: []}
            }
        }, {
            type: 'category',
            id: '7',
            attributes: {
                title: 'Category 7',
                description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
                published: true,
                position: 1,
                imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=7',
                imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=7'
            },
            relationships: {
                parentCategory: {data: {id: '5', type: 'category'}},
                childCategories: {data: []}
            }
        }]
    }
};
