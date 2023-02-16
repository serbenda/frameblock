// SPDX-License-Identifier: MIT
// Specifies the license under which the contract is published.
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract CollectionAirdrop is ERC721, ERC721Enumerable, Ownable {
    // Optional mapping for token URIs
    // A mapping that associates token IDs with their respective URIs.
    mapping(uint256 => string) private _tokenURIs;
    // The base URI for the token metadata.
    string public _uri;

    constructor(string memory name_, string memory symbol_, uint256 num_, string memory uri_, address recipient) ERC721(name_, symbol_) {
        _uri = uri_;
        // To airdrop the total amount of NFTs (10 NFTs) within the constructor
        for (uint i = 1; i <=num_; i++){
            _safeMint(recipient, i);
        }
    }

    function _baseURI() internal view override returns (string memory) {
        // Returns the base URI for the token metadata.
        return _uri;
    }

    /**
     * @dev See {ERC721-safeMint}.
     * Mints a new token to the specified address.
     */
    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     * Returns the token URI for a given token ID.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );
        string memory base = _baseURI();
        return string(abi.encodePacked(base,'/',Strings.toString(tokenId),'.json'));
    }

    // The following functions are overrides required by Solidity.

    /**
     * @dev See {ERC721-_beforeTokenTransfer}.
     * Called before any token transfer operation.
     */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev See {ERC165-supportsInterface}.
     * Checks if a given interface is supported by the contract.
     */
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool){
        return super.supportsInterface(interfaceId);
    }
}
