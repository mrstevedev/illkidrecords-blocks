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
const { PanelBody, RangeControl, TextControl, Button } = wp.components;
const { InspectorControls } = wp.blockEditor;
const { Component } = wp.element;

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
registerBlockType( 'cgb/ikr-instagram-feed-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'illkidrecords-blocks - Instagram Feed Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'illkidrecords-blocks - Instagram Feed Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
    ],
    attributes: {
        username: {
            type: 'string'
		},
		userId: {
			type: 'string'
		},
		mediaType: {
			type: 'string'
		},
		mediaUrl: {
			type: 'string'
		},
		thumbnailUrl: {
			type: 'string'
		},
		mediaArr: {
			type: 'array'
		},
		limitNumber: {
			type: 'number'
		},
		accessToken: {
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
			super(...arguments);
		}
		componentDidMount() {
			const url1 = 'https://graph.instagram.com/me?fields=username&access_token=IGQVJXMGNESE5xVHZAEOWZAwejY1TWlJUlYtaFJmMHNYSWUzX0cyeGdQWS1uS1JRMHgtLVdPbUE5SHo0R3pRTS1rWUN0dXNobHM3QXV2MjQ4bmZAZAZA3M0cGdUSXBCM0FucjJVZA1lHRklR';
			const url2 = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,timestamp&limit=${ this.props.attributes.limitNumber }&access_token=${ this.props.attributes.accessToken }`;
			
			fetch(url1).then(response1 => response1.json()).then(data => {
				this.props.setAttributes( { username: data.username } );
			});
			fetch(url2).then(response2 => response2.json()).then(data => {
				// console.log(data.data.map(data => console.log(data.thumbnail_url)));

				this.props.setAttributes( { mediaArr: data.data } );

				
				// this.props.setAttributes( { userId: data.data.map(data => data.id) } );
				// this.props.setAttributes( { mediaType: data.data.map(data => data.media_type) } );
				// this.props.setAttributes( { mediaUrl: data.data.map(data => data.media_url) } );
				// this.props.setAttributes( { thumbnailUrl: data.data.map(data => data.thumbnail_url) } );
								
			});
			// Promise.all([
			// 	fetch(url1).then( value => value.json() ),
			// 	fetch(url2).then( value => value.json() )
			// 	])
			// 	.then( ( value ) => {
			// 		//json response
			// 		// console.log(value[0].username);
			// 		// console.log('===>', value[1].data);
					
			// 		this.props.setAttributes( { username: value[0].username } );

			// 		this.props.setAttributes( { userId: value[1].data.map(data => data.id)} );

					
			// 	})
			



			// fetch('https://graph.instagram.com/me?fields=username&access_token=IGQVJXMGNESE5xVHZAEOWZAwejY1TWlJUlYtaFJmMHNYSWUzX0cyeGdQWS1uS1JRMHgtLVdPbUE5SHo0R3pRTS1rWUN0dXNobHM3QXV2MjQ4bmZAZAZA3M0cGdUSXBCM0FucjJVZA1lHRklR')
			// 	.then(res => res.json()).then(data => console.log(data));										

			// Authorize Link
			//https://www.instagram.com/oauth/authorize?client_id=544507132916814&redirect_uri=https://illkidrecords.local/auth&scope=user_profile,user_media&response_type=code
			
			// Code Received
			//https://www.instagram.com/oauth/authorize?client_id=544507132916814&redirect_uri=https://illkidrecords.local/auth&scope=user_profile,user_media&response_type=AQAE0oaHQkfhxVcJYs9cI6F-koe2mZ4lzhepJsCyybYcFwbTAUqaTzBA--5MNSzEcw59O8Dlc_pVJSVjYh1C_EUer5UYFMugRGHpF5V7HJDSEnGQUW6LO7md2fRyux3XS2GQ2b48345nFLnr7LIIT0L4L5naku6F8dfxJrwhrt8sncJD1xpq7jXohSEmokF8K0tptnAw_ymev9k-0__ng2DdIltKaCgC8zaibYduprpzJw 


			//https://api.instagram.com/oauth/access_token&client_id=544507132916814&client_secret=3ea13d6a4124df44d2ea977284c11b47&grant_type=authorization_code&redirect_uri=https://illkidrecords.local/auth&code=AQAE0oaHQkfhxVcJYs9cI6F-koe2mZ4lzhepJsCyybYcFwbTAUqaTzBA--5MNSzEcw59O8Dlc_pVJSVjYh1C_EUer5UYFMugRGHpF5V7HJDSEnGQUW6LO7md2fRyux3XS2GQ2b48345nFLnr7LIIT0L4L5naku6F8dfxJrwhrt8sncJD1xpq7jXohSEmokF8K0tptnAw_ymev9k-0__ng2DdIltKaCgC8zaibYduprpzJw


				// https://api.instagram.com/oauth/access_token \
				// -F client_id=544507132916814 \
				// -F client_secret=3ea13d6a4124df44d2ea977284c11b47 \
				// -F grant_type=authorization_code \
				// -F redirect_uri=https://illkidrecords.local/auth \
				// -F code=AQAdwtYct78O_44sR-07V06Nz5HgHZHkzKh51o3xuFnRjdHkeEQVQT4x1EL12K8RteXp0se4Q-H3ydidRZMKBU3g46q7RWh2FD7qB5QJbUxRuEW4OXSDHU1h2qmc-b6gY53XfgknulC3WtxC1qtu_Fg2O4dlTnAIU4SnU2CAPxHjVawcEQGhP_vya44M0diPLkJg-_U6E_0m86N9vh98Zt0DTFJKrLqsvOFR1IECSHyoCQ

				//{"access_token": "IGQVJVTHNuaGxJSDJYMVAtTW8yakIyaklSZAUs5ZA2VKWVpxV3JJRUZAmQUNnWWhjd1FzU0xyd0ZAKZA2phUTV0NWJOemNncG13ZAUFqNGJqREVNeGxfUkZADSDNER1QyTGZAZAU0tkdFMxQ3JXZAVB5cDBlV2dHVDAxcXVDZAW5NTnQw", user_id": 17841401714833791}%

				// curl -X GET \
				// 'https://graph.instagram.com/17841401714833791?fields=id,username&access_token=IGQVJWdUhLN05NTkxGTlBNVnN0TjkzMnN3RVJ0eGZAmRFNvTnY4eEp6U3JJRUlVejNlZAWxtZAGVNdm8xbUdPek1kRFlpYlFKam9YZAzFRMmI0akZAjRzNMR1d5MHQ1a1hHb0JDdEpvMzRlR2ZAIQkVwVEQwS3phNk9reS1sRTdV'

				// {"id":"17841401714833791","username":"spdaillkid"}%
				// https://graph.instagram.com/me/media?fields=id,caption&access_token=IGQVJWdUhLN05NTkxGTlBNVnN0TjkzMnN3RVJ0eGZAmRFNvTnY4eEp6U3JJRUlVejNlZAWxtZAGVNdm8xbUdPek1kRFlpYlFKam9YZAzFRMmI0akZAjRzNMR1d5MHQ1a1hHb0JDdEpvMzRlR2ZAIQkVwVEQwS3phNk9reS1sRTdV
				

				// Long Lived Token 
				// curl -i -X GET 
				// "https://graph.instagram.com/access_token
				// ?grant_type=ig_exchange_token
				// &client_secret=3ea13d6a4124df44d2ea977284c11b47
				// &access_token=IGQVJXMGNESE5xVHZAEOWZAwejY1TWlJUlYtaFJmMHNYSWUzX0cyeGdQWS1uS1JRMHgtLVdPbUE5SHo0R3pRTS1rWUN0dXNobHM3QXV2MjQ4bmZAZAZA3M0cGdUSXBCM0FucjJVZA1lHRklR"
		}

		handleRefreshToken = ( accessToken ) => {
			// Make a request to Long Lived Access Token Endpoint to Refresh the Access Token
			console.log(accessToken);

			//https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&&access_token=IGQVJXMGNESE5xVHZAEOWZAwejY1TWlJUlYtaFJmMHNYSWUzX0cyeGdQWS1uS1JRMHgtLVdPbUE5SHo0R3pRTS1rWUN0dXNobHM3QXV2MjQ4bmZAZAZA3M0cGdUSXBCM0FucjJVZA1lHRklR
			fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&&access_token=${ accessToken }`)
				.then(res => res.json())
				.then(data => {					
					this.props.setAttributes({ accessToken: data.access_token });
				})
		}
		// Creates a <p class='wp-block-cgb-block-illkidrecords-blocks'></p>.
		render() {
			const { mediaArr } = this.props.attributes;

			return (
				<div className={ this.props.attributes.className } style={{ textAlign: 'center' }}>
					{
						<InspectorControls>
							<PanelBody>
								<RangeControl
									label={__('Photo Request Length')}
									value={ this.props.attributes.limitNumber }
									onChange={ val => this.props.setAttributes( { limitNumber: val } ) }
									min="6"
									max="40"
								/>
								<span>
									<TextControl
										label={__(`Access Token`)}
										value={ this.props.attributes.accessToken }
										onChange={ val => this.props.setAttributes( { accessToken: val } ) }
									/>
									<Button className="button is-large is-primary" onClick={() => this.handleRefreshToken( this.props.attributes.accessToken )}>Refresh Token</Button>
								</span>
							</PanelBody>
						</InspectorControls>
					}
					<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
					<main>
						{ mediaArr ? mediaArr.map( photo => {
							if(photo.media_type === 'IMAGE') {
								return (
									<div>
										<img src={ photo.media_url } />
									</div>
								)
							} else if(photo.media_type ==='VIDEO') {
								return (
									<div>
										<img src={photo.thumbnail_url} />
									</div>
								)
							}
						}) : 'no media' }
					</main>
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
	save: () => {
		return null;
	},
} );
