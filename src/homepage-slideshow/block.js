/**
 * BLOCK: illkidrecords-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

 // Import CSS.
 import './editor.scss';
 import './style.scss';

 const { __ } = wp.i18n; // Import __() from wp.il8n;
 const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
 const { Component } = wp.element;
 const { PanelBody, ToggleControl, TextControl, Button } = wp.components;
 const { InspectorControls, RichText, MediaUpload, MediaUploadCheck } = wp.blockEditor;

 const defaultAttributes = {
	 showArrows: true,
	 showCTA: true,
	 showSlideSelection: true,
	 showBtmLabel: true,
	 showArrows: true
 }

 const arrowRight = (
	<svg xmlns="http://www.w3.org/2000/svg" width="35.333" height="57" viewBox="0 0 43.333 65">
		<path id="iconmonstr-angel-right-thin" d="M4,2.045,42.93,32.5,4,62.885,5.676,65,47.333,32.5,5.649,0Z" transform="translate(-4)" fill-rule="evenodd"/>
  	</svg>
 );

 const arrowLeft = (
	<svg class="test-class" xmlns="http://www.w3.org/2000/svg" width="35.333" height="57" viewBox="0 0 43.333 65">
		<path id="iconmonstr-angel-right-thin" d="M4,2.045,42.93,32.5,4,62.885,5.676,65,47.333,32.5,5.649,0Z" transform="translate(47.333 65) rotate(180)" fill-rule="evenodd"/>
  	</svg>  
 );

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
 registerBlockType( 'cgb/block-illkidrecords-blocks-slideshow', {
	title: __( 'illkidrecords-block - Homepage Slideshow' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		imgUrl: {
			type: 'string',
			attribute: 'src',
		},
		slideShowImgObj: {
			type: 'array',
		},
		showArrows: {
			type: Boolean,
			source: "html"
		},
		showCTA: {
			type: Boolean,
			source: "html"
		},
		showSlideSelection: {
			type: Boolean
		},
		showBtmLabel: {
			type: Boolean
		},
		CTADescriptionLeft: {
			type: 'string'
		},
		CTADescriptionRight: {
			type: 'string'
		},
		CTADescriptionSecondary: {
			type: 'string'
		},
		CTADescriptionLeftURLText: {
			type: 'string'
		},
		linkURL: {
			type: 'string'
		},
		activeId: {
			type: 'number'
		}
	},
    keywords: [
        __( 'illkidrecords-blocks – CGB Block-2' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
     ],

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
		
		 componentDidMount() {
			if(undefined === this.props.attributes.showBtmLabel) {
				this.props.setAttributes( defaultAttributes );
			}

			this.props.setAttributes({
				slideShowImgObj: JSON.parse(localStorage.getItem("media"))
			});
			// const placeHolderUrl='https://dalehartery.files.wordpress.com/2015/05/light-grey-background-pattern.jpg?w=400';
			// this.props.setAttributes({ imgUrl: placeHolderUrl });
		 }

		 componentWillUnmount() {
			 localStorage.removeItem("media");
		 }

		handleSlideSelect = (e, item, id) => {

			const url = item.url;
			this.props.setAttributes({ imgUrl: url });

			localStorage.setItem('currentImage', JSON.stringify(item));

			const listItems = document.querySelectorAll('.circles');
			for(let i = 0; i < listItems.length; i++) {
				listItems[i].classList.remove('active');
			}

			this.props.setAttributes({ activeId: id });

			e.target.parentNode.parentNode.classList.add('active');		
		}

		handleSlidePrev = (e) => {
			const myArr = this.props.attributes.slideShowImgObj;
			const activeClass = jQuery('.slide-dots-list li.active');
			if (activeClass.is(':first-child')) {
			  jQuery('.slide-dots-list li').last().addClass('active');
			  jQuery('.slide-dots-list li').first().removeClass('active');
			  const id = jQuery('.slide-dots-list li.active').data("id");

				const newObj = myArr.filter((item, index, arr) => index === id);
				const url = newObj[0].url;
		
				this.props.setAttributes({ imgUrl: url });
				this.props.setAttributes({ activeId: id });

			}
			else {
			  jQuery('.slide-dots-list li.active').prev('.slide-dots-list li').addClass('active');
			  jQuery('.slide-dots-list li.active').next('.slide-dots-list li').removeClass('active');

			  const id = jQuery(activeClass).prev().data("id");
			  const newObj = myArr.filter((item, index, arr) => index === id);
			  const url = newObj[0].url;
	  
			  this.props.setAttributes({ imgUrl: url });
			  this.props.setAttributes({ activeId: id });
			}
		}

		handleSlideNext = (e) => {
			const myArr = this.props.attributes.slideShowImgObj;

			const activeClass = jQuery('.slide-dots-list li.active');
			
			if (activeClass.is(':last-child')) {
				jQuery('.slide-dots-list li').first().addClass('active');
				// console.log(jQuery('.slide-dots-list li.active').next('.slide-dots-list li').prevObject[0]);
				const id = jQuery('.slide-dots-list li.active').data("id");

				const newObj = myArr.filter((item, index, arr) => index === id);
				const url = newObj[0].url;
		
				this.props.setAttributes({ imgUrl: url });
				this.props.setAttributes({ activeId: id });

				jQuery('.slide-dots-list li').last().removeClass('active');
			}
			else {
				jQuery('.slide-dots-list li.active').next('.slide-dots-list li').addClass('active');
				// console.log(jQuery('.slide-dots-list li.active').next('.slide-dots-list li').prevObject[1])
				const id = jQuery(activeClass).next().data("id");
				const newObj = myArr.filter((item, index, arr) => index === id);
				const url = newObj[0].url;
		
				this.props.setAttributes({ imgUrl: url });
				this.props.setAttributes({ activeId: id });
				
				jQuery('.slide-dots-list li.active').prev('.slide-dots-list li').removeClass('active');
			}
		}

         render() {
			const bgStyle = {	
				transition: '.12s ease-in-out',
				backgroundImage: "url(" +  this.props.attributes.imgUrl +  ")"				
			};
			return (			 
				<div className={ this.props.className }>
					{
					   <InspectorControls>
						   <PanelBody title="Toggle Options">
							   <ToggleControl
								   checked={this.props.attributes.showArrows}
								   label={__('Slideshow Arrows')}
								   onChange={() => this.props.setAttributes({ showArrows: !this.props.attributes.showArrows })}
							   />
							   <ToggleControl
								   checked={this.props.attributes.showCTA}
								   label={__('Call to Action')}
								   onChange={() => this.props.setAttributes({ showCTA: !this.props.attributes.showCTA })}
							   />							
							   <ToggleControl
								   checked={this.props.attributes.showSlideSelection}
								   label={__('Slideshow Selection')}
								   onChange={() => this.props.setAttributes({ showSlideSelection: !this.props.attributes.showSlideSelection })}
							   />							
							   <ToggleControl
								   checked={this.props.attributes.showBtmLabel}
								   label={__('Bottom Label')}
								   onChange={() => this.props.setAttributes({ showBtmLabel: !this.props.attributes.showBtmLabel })}
							   />
							   <TextControl 
								   type="text"
								   label={ __('Add CTA Link URL')}
								   value={ this.props.attributes.linkURL }
								   className="cta-checkit__url"
								   placeholder={ 'Add URL' }
								   onChange={ value => this.props.setAttributes({ linkURL: value }) }
							   />
						   </PanelBody>
					   </InspectorControls>
					}
					<div className="slideshow__slide--main" style={ bgStyle }>

						<Button className="btn button" style={{ position: 'absolute', top: '1rem', right: '1rem' }} onClick={
							(e) => {
								const currentId = this.props.attributes.activeId;
								console.log(currentId);

								// take currentId and filter that object out of localStorage
								const currObj = JSON.parse(localStorage.getItem('media'));

								console.log(currObj);

								const newObj = currObj.filter((obj, index) => index !== currentId);
								console.log(newObj);
								localStorage.setItem('media', JSON.stringify(newObj));
								console.log('newObj', newObj);

								if(newObj.length > 0) {
									const newImgUrl = newObj[newObj.length-1].url;

									this.props.setAttributes({ 
										slideShowImgObj: JSON.parse(localStorage.getItem("media")),
										imgUrl: newImgUrl
									});
									
									const listItems = document.querySelectorAll('.circles');
									const firstItem = listItems[0];
									firstItem.classList.add('active');
									
								} else {
									const placeHolderUrl='https://dalehartery.files.wordpress.com/2015/05/light-grey-background-pattern.jpg?w=300';
									this.props.setAttributes({ imgUrl: placeHolderUrl });
								}
							}
						}>
							Remove Current Image
							</Button>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ media => {	
								   const allEntries = JSON.parse(localStorage.getItem("media")) || [];
								   allEntries.unshift(media);
								   // console.log(allEntries);
								   localStorage.setItem("media", JSON.stringify(allEntries));
   
								   this.props.setAttributes({
									   // Add new Array Entry to attributes
									   slideShowImgObj: allEntries
								   });

								   // Set last list item active 
								   const listItems = document.querySelectorAll('.circles');
								   const firstItem = listItems[0];
								   console.log('listItems inside upload', firstItem);
								
								   for(let i = 0; i < listItems.length; i++) {
									   listItems[i].classList.remove('active');
								   }
													
								   console.log('slideShowImgObj', this.props.attributes.slideShowImgObj);
								   const activeClass = jQuery('.slide-dots-list li:first-child');
								   const id = jQuery(activeClass).data("id");

								   console.log('id', id);
								   const lastEntry = allEntries[0];
								   const firstEntryUrl = lastEntry.url;
								   console.log('slideShowImgObj', firstEntryUrl);
								   firstItem.classList.add('active');

								   this.props.setAttributes({
									   imgUrl: firstEntryUrl,
									   activeId: id
								   });
								}}
								type="image"
								render={({ open }) => (
									this.props.attributes.imgUrl ?
										<Button
											className="button button-large"
											onClick={ open }>
											Select Another Image
										</Button> : <Button
											className="button button-large"
											onClick={ open }
											>
											Select An Image
										</Button>
								)}
							/>
						</MediaUploadCheck>
						{this.props.attributes.showCTA ? (
							<div className="slide__CTA">
							<div className="slide__CTA--left">
							   <RichText 
								   tagName="h1"
								   value={ this.props.attributes.CTADescriptionLeft }
								   placeholder={__('Add CTA Description')}
								   onChange={ value => this.props.setAttributes( { CTADescriptionLeft: value } ) }
							   />
							   <div className="slide__CTA--leftBtm">								
								   <RichText 
									   placeholder={__('Add CTA Description')}
									   tagName="h4"
									   value={ this.props.attributes.CTADescriptionRight }
									   onChange={ value => this.props.setAttributes({ CTADescriptionRight: value }) }
								   />
								   <RichText 
									   tagName="div"
									   className="cta-link-text"
									   value={ this.props.attributes.CTADescriptionLeftURLText }
									   placeholder={__( 'Add CTA Text' )}
									   onChange={ value => this.props.setAttributes({ CTADescriptionLeftURLText: value }) }
								   />
							   </div>
							</div>
							<div className="cta-separator"></div>
							<div className="slide__CTA--right">
							   <RichText 
								   placeholder="Add Secondary Description" 
								   tagName="h4"
								   value={ this.props.attributes.CTADescriptionSecondary }
								   onChange={ value => this.props.setAttributes({ CTADescriptionSecondary: value }) }
								   />
							</div>
						</div>
						) : null}
						{this.props.attributes.showArrows ? (
							<div className="slideshow-arrows">
								<ul className="slideshow-arrows-list">
								   <li><a className="prev" href="#!" title="Previous Slide" onClick={this.handleSlidePrev}>{arrowLeft}</a></li>
								   <li><a className="next" href="#!" title="Next Slide" onClick={this.handleSlideNext}>{arrowRight}</a></li>
								</ul>
							</div>
						) : ''}
						{this.props.attributes.showSlideSelection ? (
						   <div classname="slide-selection-dots">
							   <ul className="slide-dots-list">
								   { this.props.attributes.slideShowImgObj ? (
										this.props.attributes.slideShowImgObj.map((item, index, arr) => (
											<li data-id={index} className={`circles ${index === this.props.attributes.activeId ? 'active' : ''} `}>
												<a href="#!" onClick={e => this.handleSlideSelect(e, item, index)}>
													<span class={`dots dot-${index}`}></span>
												</a>
											</li>
										))
								   ) : null}
							   </ul>
						   </div>
						) : ''}
						{this.props.attributes.showBtmLabel ? (
							<div className="vinyl-store-label">
								<h3>Vinyl Store</h3>
							 </div>
						) : ''}
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
			backgroundImage: "url(" +  attributes.imgUrl +  ")",
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: '0 -31px',
			height: '100%',
			display: 'flex',
			alignItems: 'center'
		 }

		//  const handleSlideSelect = e => {
		// 	 console.log(e);
		//  }
         return (	
             <div className={ attributes.className } style={ bgStyle }
				data-aos="fade-in" 
				data-aos-delay="10"
				data-aos-duration="10"
				data-aos-easing="ease-in-out"
				data-aos-mirror="true"
				data-aos-once="false"
				data-aos-anchor-placement="top-center"
			 >
			{ attributes.showCTA ? (
				 <div className="slide__CTA"
					data-aos="fade-left" 
					data-aos-delay="1400"
					data-aos-duration="10"
					data-aos-easing="ease-in-out">
				<div className="slide__CTA--left">
					<RichText.Content tagName="h1" value={ attributes.CTADescriptionLeft } />
						<div className="slide__CTA--leftBtm">
							<RichText.Content tagName="h4" value={ attributes.CTADescriptionRight } />
							<a href={ attributes.linkURL } className="cta-link-text">{ attributes.CTADescriptionLeftURLText }</a>
						</div>
				</div>
					<div className="cta-separator"></div>
				    <div className="slide__CTA--right">
						<RichText.Content tagName="h4" value={ attributes.CTADescriptionSecondary } />
					 </div>
			 </div>	
			) : '' }				 
			 {attributes.showArrows ? (
				<div className="slideshow-arrows">
					 <ul className="slideshow-arrows-list">
						<li><a href="#!" title="Previous Slide" className="arrow-left">{arrowLeft}</a></li>
						<li><a href="#!" title="Next Slide" className="arrow-right">{arrowRight}</a></li>
					 </ul>
				</div>
			) : ''}	 
			{attributes.showSlideSelection ? (
				<div classname="slide-selection-dots">
					<ul className="slide-dots-list">					
						  { attributes.slideShowImgObj ? (
								attributes.slideShowImgObj.map((item, index, arr) => (
									<li data-id={index} className={`circles ${index === attributes.activeId ? 'active' : ''} `}>
										<a href="#!" onClick={e => handleSlideSelect(e, item, index)}>
											<span class={`dots dot-${index}`}></span>
										</a>
									</li>
								))
						   ) : null}
					</ul>
				</div>
			) : ''}
			{attributes.showBtmLabel ? (
				 <div className="vinyl-store-label">
				 	<h3>Vinyl Store</h3>
			 	 </div>
			) : ''}
			</div>
         );
     }
 });