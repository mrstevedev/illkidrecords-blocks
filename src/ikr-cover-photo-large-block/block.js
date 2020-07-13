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
const { PanelBody, RadioControl, RangeControl, ToggleControl, Button } = wp.components;
const { InspectorControls, RichText, MediaUpload, MediaUploadCheck } = wp.blockEditor;

const defaultAttributes = {
    showCTA: true
}

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
registerBlockType( 'cgb/block-illkidrecords-blocks-large-cover-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'illkidrecords-blocks - Large Cover Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'illkidrecords-blocks — Large Cover Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
    ],
    attributes: {
        imgUrl: {
            type: 'string'
        },
        showCTA: {
            type: 'boolean'
        },
        CTADescriptionTop: {
            type: 'string'
        },
        CTADescriptionBtm: {
            type: 'string'
        },
        CTADescriptionBtmCoupon: {
            type: 'string'
        },
        ctaPosition: {
            type: 'string',
            default: 'left'
        },
        bgYPosition: {
            type: 'number'
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
	edit: ( { attributes, setAttributes } ) => {
        // Creates a <p class='wp-block-cgb-block-illkidrecords-blocks'></p>.
        if(undefined === attributes.showCTA) {
            setAttributes( defaultAttributes );
        }
        const bgStyle = {
            transition: '.12s ease-in-out',
            backgroundImage: "url(" +  attributes.imgUrl +  ")",
            backgroundPosition: `center ${ attributes.bgYPosition }px`,
            backgroundSize: 'cover'
        }
		return (
			<div className={ attributes.className }>
				<div className="bg__photo--coverLg" style={ bgStyle }>
                    {
                        <InspectorControls>
                            <PanelBody title="Toggle Options">
                                <ToggleControl 
                                    checked={ attributes.showCTA }
                                    label={__('Show CTA')}
                                    onChange={ () => setAttributes({ showCTA: !attributes.showCTA }) }
                                />
                                <RadioControl 
                                    label={__('CTA Position')}
                                    selected={ attributes.ctaPosition }
                                    options={ [
                                        { label: 'Left', value: 'left' },
                                        { label: 'Right', value: 'right' }
                                    ] }
                                    title="CTA position"
                                    onChange={ value => setAttributes({ ctaPosition: value }) }
                                />
                            <RangeControl 
                                label={__('Adjust Background-Y Position')}
                                value={ attributes.bgYPosition }
                                onChange={ val => setAttributes({ bgYPosition: val })}
                                min="-1000"
                                max="1000"
                            />
                            </PanelBody>
                        </InspectorControls>
                    }
                    <MediaUploadCheck>
                        <MediaUpload 
                            onSelect={ media => {
                                setAttributes({ imgUrl: media.url })
                            } }
                            type="image"
                            render={
                                ({ open }) => (
                                    attributes.imgUrl ? 
                                    <Button
                                        className="button button-large"
                                        onClick={ open }> 
                                        Select Another Photo
                                    </Button> : <Button
                                        className="button button-large"
                                        onClick={ open }>
                                        Select A Photo
                                    </Button>                                   
                                )
                            }
                        />
                    </MediaUploadCheck>
                    { attributes.showCTA ? (
                        <div className={`cta__container ${ attributes.ctaPosition === 'left' ? 'left' : attributes.ctaPosition === 'right' ? 'right' : '' }`}>
                          <div className="cta__container--left">
                          <RichText 
                                tagName="h1"
                                className="cta__container--TxtTop"
                                value={ attributes.CTADescriptionTop }
                                placeholder={__('Add CTA Description')}
                                onChange={ value =>  setAttributes({ CTADescriptionTop: value }) }
                            />
                            <div className="cta__container--btm">
                                <RichText 
                                    tagName="h2"
                                    className="cta__container--TxtBtm"
                                    placeholder={__('Add CTA Description Bottom')}
                                    value={ attributes.CTADescriptionBtm }
                                    onChange={ value => setAttributes({ CTADescriptionBtm: value }) }
                                />
                                <RichText 
                                    tagName="h2"
                                    className="cta__container--TxtBtmCoupon"
                                    placeholder={__('Add CTA Description Bottom')}
                                    value={ attributes.CTADescriptionBtmCoupon }
                                    onChange={ value => setAttributes({ CTADescriptionBtmCoupon: value }) }
                            />
                            </div>
                          </div>                          
                        </div>
                    ) : '' }
                </div>
			</div>
		);
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
            backgroundImage: "url(" +  attributes.imgUrl +  ")",
            backgroundPosition: `center ${ attributes.bgYPosition }px`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
		return (
			<div className={ attributes.className }>
				<div className="bg__photo--coverLg" style={ bgStyle }>
                    { attributes.showCTA ? (
                        <div className={`cta__container ${ attributes.ctaPosition === 'left' ? 'left' : attributes.ctaPosition === 'right' ? 'right' : '' }`}>
                            <div className="cta__container--left">
                                <RichText.Content tagName="h1" value={ attributes.CTADescriptionTop } className="cta__container--TxtTop" />
                                <div className="cta__container--btm">
                                    <RichText.Content tagName="h2" value={ attributes.CTADescriptionBtm } className="cta__container--TxtBtm" />
                                    <RichText.Content tagName="h2" value={ attributes.CTADescriptionBtmCoupon } className="cta__Container--TxtBtmCoupon" />
                                </div>
                            </div>
                        </div>
                    ) : '' }
                </div>
			</div>
		);
	},
} );
