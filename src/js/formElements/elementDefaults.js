export default {
    resourceFilters: {
        text: {
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'inputType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        number: {
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'inputType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        checkbox: {
            valueMap: {checked: 'true', unchecked: ''},
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'checkboxType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        select: {
            attributes: {
                label: {class: 'labelType1'},
                inputWrapper: {class: 'selectType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        multipleSelect: {
            attributes: {
                label: {class: 'labelType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        externalAdmin: {
            attributes: {
                label: {class: 'labelType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        date: {
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'inputType1', size: 10},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        dateTime: {
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'inputType1', size: 17},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        nestedSelect: {
            attributes: {
                label: {class: 'labelType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        }
    },
    resourceEdit: {
        mainRegion: {
            text: {
                attributes: {
                    input: {class: 'inputType2'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            number: {
                attributes: {
                    input: {class: 'inputType2'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            textarea: {
                attributes: {
                    input: {
                        class: 'inputType2',
                        rows: 1,
                        autocomplete: 'off',
                        autocorrect: 'off',
                        autocapitalize: 'off',
                        spellcheck: 'false'
                    },
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            html: {
                attributes: {
                    input: {class: 'htmlInputType1'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            date: {
                attributes: {
                    input: {class: 'inputType2'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            dateTime: {
                attributes: {
                    input: {class: 'inputType2'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            checkbox: {
                attributes: {
                    input: {class: 'checkboxType1'},
                    label: {class: 'checkboxLabelType1'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            select: {
                attributes: {
                    label: {class: 'labelType2'},
                    inputWrapper: {class: 'selectType1'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            multipleSelect: {
                attributes: {
                    label: {class: 'labelType2'},
                    inputWrapper: {},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            externalAdmin: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            includedAdmin: {
                relation: {type: 'hasMany'},
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'includedAdminBlockType1'},
                    inputWrapper: {class: 'includedAdminElement'}
                }
            },
            map: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'mapElementType1'}
                }
            },
            fileAttachment: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'fileAttachment'}
                }
            },
            mediaPreview: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'mediaPreviewType1'}
                }
            },
            media: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'mediaInputType1'}
                }
            },
            nestedSelect: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            }
        },
        sideRegion: {
            text: {
                attributes: {
                    input: {class: 'inputType1 fullWidth'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            number: {
                attributes: {
                    input: {class: 'inputType1 fullWidth'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            textarea: {
                attributes: {
                    input: {
                        class: 'inputType1 fullWidth',
                        rows: 1,
                        autocomplete: 'off',
                        autocorrect: 'off',
                        autocapitalize: 'off',
                        spellcheck: 'false'
                    },
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            date: {
                attributes: {
                    input: {class: 'inputType1 fullWidth'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            dateTime: {
                attributes: {
                    input: {class: 'inputType1 fullWidth'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            checkbox: {
                attributes: {
                    input: {class: 'checkboxType1'},
                    label: {class: 'checkboxLabelType1'},
                    wrapper: {class: 'inputBlockType1 sideRegionCheckboxBlock'}
                }
            },
            select: {
                attributes: {
                    label: {class: 'labelType2'},
                    inputWrapper: {class: 'selectType1 fullWidth'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            multipleSelect: {
                attributes: {
                    label: {class: 'labelType2'},
                    input: {class: 'withOutline'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            stateSelect: {
                attributes: {
                    label: {class: 'labelType2'},
                    inputWrapper: {class: 'fullWidth'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            externalAdmin: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            },
            mediaPreview: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'mediaPreviewType1'}
                }
            },
            media: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'mediaInputType1'}
                }
            },
            nestedSelect: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'}
                }
            }
        }
    }
};
