/**
 * BLOCK: illkidrecords-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Component } = wp.element;
const { PanelBody, ToggleControl, TextControl, SelectControl, Button } = wp.components;
const { InspectorControls, RichText, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { apiFetch } = wp;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-illkidrecords-blocks-crew-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'illkidrecords-blocks - Crew Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'illkidrecords-blocks — Crew Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
    ],
    attributes: {
        imgUrl: {
            type: 'string'
        },

        artistName: {
            type: 'string'
        },

        artistDescription: {
            type: 'string'
        },
        artistPage: {
            type: 'string'
        },
        optionsValues: {
            type: 'array'
        },
        pageUrl: {
            type: 'string'
        }
    },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: class extends Component {
        constructor() {
            super( ...arguments );
        }
        // Creates a <p class='wp-block-cgb-block-illkidrecords-blocks'></p>.

        componentDidMount() {
            console.log('ComponentDidMount Ran');

            const optionsArr = [];

            apiFetch({ path: '/wp/v2/pages' }).then( response => {
                response.map(data => {
                    optionsArr.push( {
                        value: data.id,
                        label: data.title.rendered,
                        content: data.link
                } );
                    this.props.setAttributes( { optionsValues: optionsArr  } )
                });
            });
        }

        selectPage(value) {

            const newSelectedPage = this.props.attributes.optionsValues;
			const result = newSelectedPage.filter( obj => {
				return obj.value == value;
            } );

            this.props.setAttributes({ artistPage: value });
            this.props.setAttributes({ pageUrl: result[0].content });
        }

        render() {
        const bgStyle = {
            transition: '.12s ease-in-out',
            backgroundImage: "url(" +  this.props.attributes.imgUrl +  ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '180px',
            height: '180px',
            borderRadius: '100%',
            textAlign: 'center',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
		return (
			<div className={ this.props.attributes.className }>
                {
                    <InspectorControls>
                        <PanelBody title="Crew Options">
                            <SelectControl                                
                                label={__('Select A Page')}
                                value={ this.props.attributes.artistPage }
                                options={ this.props.attributes.optionsValues }
                                onChange={ value => {
                                    this.selectPage( value );
                                } }
                            />
                        </PanelBody>
                    </InspectorControls>
                }
                <div className="container">
				    <div className="crew__component--card">
                        <div className="crew__component--avatar" style={ bgStyle }>
                            <MediaUploadCheck>
                                <MediaUpload 
                                    onSelect={ media => {
                                        console.log(media);
                                        this.props.setAttributes({ imgUrl: media.url })
                                    } }
                                    type="image"
                                    render={ 
                                        ({ open }) => (
                                       this.props.attributes.imgUrl ? 
                                       <Button
                                            className="button button-large"
                                            onClick={ open }>
                                         Select Another Photo
                                       </Button>
                                     : <Button
                                        className="button button-large"
                                        onClick={ open }>
                                         Select A Photo
                                       </Button> 
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                            <RichText 
                                tagNme="h1"
                                className="crew__component--artist"
                                value={ this.props.attributes.artistName }
                                placeholder={__('Enter Artist Name')} 
                                onChange={ val => this.props.setAttributes({ artistName: val }) }
                            />
                            <RichText
                                tagNme="h1"
                                className="crew__component--description"
                                value={ this.props.attributes.artistDescription }
                                placeholder={__('Enter Artist Description')}
                                onChange={ val => this.props.setAttributes({ artistDescription: val }) }
                            />
                    </div>
                </div>
			</div>
            );
        }
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( { attributes } ) => {
        const bgStyle = {
            transition: '.12s ease-in-out',
            backgroundImage: "url(" +  attributes.imgUrl +  ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '180px',
            height: '180px',
            borderRadius: '100%',
            textAlign: 'center',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
		return (
			<div className={ attributes.className }>
                 <div className="container">
				    <div className="crew__component--card">
                        <a href={ attributes.artistUrl }>
                            <div className="crew__component--avatar" style={ bgStyle }>
                                <a href={ attributes.pageUrl } className="crew__component--btn">View</a>
                            </div>
                             <RichText.Content tagName="h1" className="crew__component--artist" value={ attributes.artistName } />
                             <RichText.Content tagName="p" className="crew__component--description" value={ attributes.artistDescription } />
                        </a>
                    </div>
                </div>
			</div>
		);
	},
} );
